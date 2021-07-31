import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:4000/auth/github/callback',
      scope: ['user:email']
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: any): Promise<any> {
    const { displayName, emails, photos, id } = profile;
    const user = {
      externalId: id,
      email: emails[0].value,
      displayName: displayName,
      imageUrl: photos[0].value
    };
    try {
      await this.authService.validateGitHubUser(user);
    } catch (ex) {
      console.log(ex);
      return done(new UnauthorizedException(), false);
    }

    return done(null, { ...user, accessToken });
  }
}
