import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateUserInput } from './dto/CreateUser.input';
import { UpdateUserInput } from './dto/UpdateUser.input';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver()
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
  async createUser(@Args('input') createUserData: CreateUserInput): Promise<User> {
    return await this.usersService.create(createUserData);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('input') updateUserData: UpdateUserInput
  ): Promise<User> {
    return this.usersService.update(uuid, updateUserData);

  }

  @Mutation(() => User)
  async deleteUser(@Args('uuid', { type: () => String }) uuid: string): Promise<User> {
    return this.usersService.delete(uuid);
  }
}
