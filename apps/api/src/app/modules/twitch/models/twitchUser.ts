import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TwitchUser {
  @Field() id: string;

  @Field() login: string;

  @Field() description: string;

  @Field() display_name: string;

  @Field() profile_image_url: string;
}
