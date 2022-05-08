import { ValidateNested } from 'class-validator';
import { ArgsType, Field } from 'type-graphql';
import { ClipReactionType } from '../types/ClipReactionType';

@ArgsType()
export class SetClipReactionArgs {
  @Field(type => String)
  @ValidateNested()
  clipId: string;

  @Field(type => ClipReactionType)
  @ValidateNested()
  type: ClipReactionType;
}
