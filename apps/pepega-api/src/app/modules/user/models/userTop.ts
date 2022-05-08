import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class UserTop {
  @Field(type => ID)
  id: string;

  @Field()
  count: number;

  @Field(type => User)
  user: User;
}
