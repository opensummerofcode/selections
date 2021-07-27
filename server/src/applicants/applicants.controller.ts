import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';

@Controller('submission')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @Post()
  async createApplicant(@Body() submission: String) {
    // 
  }
}
