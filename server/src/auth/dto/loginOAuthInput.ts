import { Field, InputType } from '@nestjs/graphql';
import { OAuthProvider } from 'common';

@InputType()
export class LoginOAuthInput {
  @Field()
  accessToken: string;

  @Field(() => OAuthProvider)
  provider: OAuthProvider;
}
