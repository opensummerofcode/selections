import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: []
})
export class UsersModule {}
