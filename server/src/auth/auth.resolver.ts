import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context, Mutation } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import Ctx from '../lib/context.type';
import { AuthService } from './auth.service';
import { Profile } from 'passport';
import { LoginOAuthInput } from './dto/loginOAuthInput';
import { OAuthUserResponse } from './dto/oAuthUserResponse';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User, { nullable: true })
  async me(@Context() context: Ctx) {
    return context.req.user;
  }

  /*
  @UseGuards(SocialAuthGuard)
  @Mutation(() => oAuthUserResponse)
  async loginSocial(profile: Profile, input: LoginOAuthInput): Promise<oAuthUserResponse> {
    const social = await this.authService.loginSocial(profile, input.provider);

    if (social.isError()) {
      return [social.value];
    }

    const authUser = await this.authService.signToken(social.value);
    return authUser;
  }
  */

  @Query(() => User, { nullable: true })
  async logout(@Context() context: Ctx) {
    return this.authService.logout(context);
  }
}
