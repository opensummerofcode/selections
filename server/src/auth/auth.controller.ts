import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('auth/github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    // Guard will work its magic
  }

  @Get('auth/github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthRedirect(@Req() req, @Res() res) {
    await this.authService.loginWithGithub(req);
    return res.redirect(process.env.FRONTEND_URL || 'http://localhost:4000');
  }
}
