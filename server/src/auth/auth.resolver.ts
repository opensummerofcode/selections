import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Context, Mutation } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import Ctx from '../lib/context.type';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => User, { nullable: true })
  async me(@Context() context: Ctx) {
    console.log(context.req.user);
    return context.req.user;
  }

  @Query(() => User, { nullable: true })
  async logout(@Context() context: Ctx) {
    return this.authService.logout(context);
  }
}
