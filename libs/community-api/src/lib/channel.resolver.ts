import {
  Args,
  Context,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PrismaService } from '@dream/prisma';
import { Channel } from './models/channel.model';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Inject, UseGuards } from '@nestjs/common';
import { CreateChannelInput } from './dto/createChannel.input';
import { UpdateChannelInput } from './dto/updateChannel.input';
import { AuthGuard } from '@dream/auth-api';
import { User } from '@dream/user-api';

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private readonly pubsub: RedisPubSub
  ) {}

  @ResolveField()
  async onlineCount(@Parent() channel: Channel) {
    const { id } = channel;
    const connections = await this.prisma.connection.findMany({
      where: {
        channel: { id },
      },
      select: { ipHash: true },
      distinct: ['ipHash'],
    });

    return connections.length;
  }

  @Query(() => Channel)
  channel(
    @Args({ name: 'name', type: () => String }) name: string,
    @Args({ name: 'communityId', type: () => String }) communityId: string
  ) {
    return this.prisma.channel.findFirst({
      where: { name, communityId, deleted: false },
    });
  }

  @Query(() => [User])
  channelUsersOnline(
    @Args({ name: 'channelId', type: () => String }) channelId: string
  ) {
    return this.prisma.user.findMany({
      where: {
        connection: {
          some: {
            channelId,
          },
        },
      },
    });
  }

  @Query(() => [Channel])
  channels(@Args({ name: 'name', type: () => String }) name: string) {
    return this.prisma.channel.findMany({
      where: {
        deleted: false,
        community: { name },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  @Mutation(() => Channel)
  @UseGuards(AuthGuard)
  async createChannel(
    @Args({ name: 'input', type: () => CreateChannelInput })
    input: CreateChannelInput,
    @Context('userId') userId: string
  ) {
    const community = await this.prisma.community.findUnique({
      where: { id: input.communityId },
      include: { channels: true },
    });

    if (community.ownerId !== userId) {
      throw 'Deny';
    }

    if (community.channels.length >= 10) {
      throw 'Channels per community limit';
    }

    const channelWithSameName = await this.prisma.channel.findFirst({
      where: {
        communityId: input.communityId,
        name: input.name,
        deleted: false,
      },
    });

    if (channelWithSameName) {
      throw 'Channel with same name is exists in the community';
    }

    return this.prisma.channel.create({
      data: {
        ...input,
      },
    });
  }

  @Mutation(() => Channel)
  @UseGuards(AuthGuard)
  async updateChannel(
    @Args({ name: 'input', type: () => UpdateChannelInput })
    input: UpdateChannelInput,
    @Context('userId') userId: string
  ) {
    const { channelId, communityId, ...data } = input;

    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
      include: { channels: true },
    });

    if (community.ownerId !== userId) {
      throw 'Deny';
    }

    const channelWithSameName = await this.prisma.channel.findFirst({
      where: {
        communityId,
        name: input.name,
        deleted: false,
        id: {
          not: channelId,
        },
      },
    });

    if (channelWithSameName) {
      throw 'Channel with same name is exists in the community';
    }

    return this.prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        ...data,
      },
    });
  }

  @Mutation(() => Channel)
  @UseGuards(AuthGuard)
  async deleteChannel(
    @Args({ name: 'channelId', type: () => ID })
    channelId: string,
    @Context('userId') userId: string
  ) {
    const channelIsExist = await this.prisma.channel.findFirst({
      where: {
        id: channelId,
        community: {
          ownerId: userId,
        },
      },
    });

    if (!channelIsExist) {
      throw 'Deny';
    }

    return this.prisma.channel.update({
      where: {
        id: channelId,
      },
      data: {
        deleted: true,
      },
    });
  }
}
