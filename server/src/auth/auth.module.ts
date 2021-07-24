import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [UsersModule, PassportModule, PrismaModule],
  providers: [AuthService, UsersService]
})
export class AuthModule {}
