import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/UpdateUser.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  async user(@Args('uuid', { type: () => String }) uuid: string) {
    return this.usersService.findOneByUuid(uuid);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('input') updateUserData: UpdateUserInput
  ): Promise<User> {
    return this.usersService.update(uuid, updateUserData);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('uuid', { type: () => String }) uuid: string): Promise<boolean> {
    this.usersService.delete(uuid);
    return true;
  }

  @Mutation(() => Boolean)
  async addUserToProject(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('projectId', { type: () => Int }) projectId: number
  ) {
    await this.usersService.addToProject(userId, projectId);
    return true;
  }

  @Mutation(() => Boolean)
  async removeUserFromProject(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('projectId', { type: () => Int }) projectId: number
  ) {
    await this.usersService.removeFromProject(userId, projectId);
    return true;
  }
}
