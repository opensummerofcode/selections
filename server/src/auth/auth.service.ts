import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { IExternalUserInput } from 'common';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // const user = await this.usersService.findOneById(username);

    return null;
  }

  async validateGitHubUser(details: IExternalUserInput): Promise<User> {
    let user;
    try {
      user = await this.userService.findOneByExternalId(details.externalId);
    } catch (ex) {
      if (ex.statusCode === 404) {
        return this.userService.createFromExternal(details);
      }
    }
    return user;
  }
}
