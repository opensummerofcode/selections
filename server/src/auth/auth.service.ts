import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';
import { IExternalUserInput } from 'common';
import { CookieOptions } from 'express';
import { JwtAuthService } from './jwt/jwt-auth.service';

const cookieOptions: CookieOptions = {
  domain: process.env.HOST || 'localhost',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  httpOnly: true,
  path: '/'
};

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtAuthService: JwtAuthService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // const user = await this.usersService.findOneById(username);

    return null;
  }

  async validateGitHubUser(details: IExternalUserInput): Promise<User> {
    let user;
    try {
      user = await this.userService.findOneByExternalId(details.externalId);
    } catch (ex) {
      if (ex.status === 404) {
        return this.userService.createFromExternal(details);
      }
    }
    return user;
  }

  async loginWithGithub(context) {
    if (!context.user) {
      return 'No user from GitHub';
    }

    const accessToken = this.jwtAuthService.login(context.user);
    context.res.cookie('token', accessToken, cookieOptions);

    return context.user;
  }

  async logout(context) {
    context.res.cookie('token', '', { ...cookieOptions, maxAge: 0 });
    return null;
  }
}
