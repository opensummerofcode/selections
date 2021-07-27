import { Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsResolver } from './applicants.resolver';
import { PrismaModule } from '../prisma.module';
import { SkillsModule } from '../skills/skills.module';

@Module({
  imports: [PrismaModule, SkillsModule],
  providers: [ApplicantsService, ApplicantsResolver]
})
export class ApplicantsModule {}
