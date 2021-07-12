import { Module } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { ApplicantsResolver } from './applicants.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ApplicantsService, ApplicantsResolver]
})
export class ApplicantsModule {}
