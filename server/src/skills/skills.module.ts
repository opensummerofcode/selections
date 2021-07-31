import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma.module';
import { SkillsResolver } from './skills.resolver';
import { SkillsService } from './skills.service';

@Module({
  imports: [PrismaModule],
  providers: [SkillsService, SkillsResolver],
  exports: [SkillsService]
})
export class SkillsModule {}
