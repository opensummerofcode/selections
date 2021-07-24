import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  githubLogin(req) {
    if (!req.user) {
      return 'No user from GitHub';
    }
    return {
      message: 'User info from GitHub',
      user: req.user
    };
  }
}
