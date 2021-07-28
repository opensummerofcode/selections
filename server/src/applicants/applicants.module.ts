import { Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsResolver } from './applicants.resolver';
import { PrismaModule } from '../prisma.module';
import { SkillsModule } from '../skills/skills.module';
import { ApplicantsController } from './applicants.controller';

@Module({
  imports: [PrismaModule, SkillsModule],
  controllers: [ApplicantsController],
  providers: [ApplicantsService, ApplicantsResolver]
})
export class ApplicantsModule {}
