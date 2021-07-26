import { Module } from '@nestjs/common';
import { SkillsModule } from '../skills/skills.module';
import { PrismaModule } from '../prisma.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [PrismaModule, SkillsModule],
  providers: [ProjectsResolver, ProjectsService]
})
export class ProjectsModule {}
