import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma.module';
import { ProjectsResolver } from './projects.resolver';
import { ProjectsService } from './projects.service';

@Module({
  imports: [PrismaModule],
  providers: [ProjectsResolver, ProjectsService]
})
export class ProjectsModule {}
