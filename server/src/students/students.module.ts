import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';

@Module({
  providers: [StudentsService, StudentsResolver]
})
export class StudentsModule {}
