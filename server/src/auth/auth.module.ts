import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [UsersModule, PassportModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, UsersService]
})
export class AuthModule {}
