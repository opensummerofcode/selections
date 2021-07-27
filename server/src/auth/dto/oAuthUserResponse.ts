import { User } from '../../users/models/user.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OAuthUserResponse {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
