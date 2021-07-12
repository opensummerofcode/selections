import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Applicant } from '@prisma/client';

@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}

  async applicants(): Promise<Applicant[]> {
    return this.prisma.applicant.findMany();
  }
}
