import { IsOptional, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class ClipCommentCreateInput {
  @Field()
  @Length(1, 2000)
  content: string;

  @Field()
  clipId: string;
}
