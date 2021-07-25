import { Resolver, Query, Context } from '@nestjs/graphql';
import { User } from '../users/models/user.model';
import Ctx from '../types/context.type';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class SuggestionsResolver {
  constructor(private authService: AuthService) {}

  @Query(() => User, { nullable: true })
  async me(@Context() context: Ctx) {
    return context.req.user;
  }

  @Query(() => User, { nullable: true })
  async logout(@Context() context: Ctx) {
    // return this.usersService.logout(context);
  }
}
