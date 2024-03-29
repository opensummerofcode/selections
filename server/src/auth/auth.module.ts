import { HttpModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [UsersModule, PassportModule, PrismaModule, JwtAuthModule],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, UsersService, JwtAuthService, GithubStrategy]
})
export class AuthModule {}
