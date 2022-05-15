import { Field, ObjectType } from 'type-graphql';
import { ClipReactionType } from '../types/ClipReactionType';

@ObjectType()
export class ClipReaction {
  @Field() id: string;

  @Field(type => ClipReactionType)
  type: ClipReactionType;

  @Field() clipId: string;

  @Field() userId: string;

  @Field() createdAt: string;
}
