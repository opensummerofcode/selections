import { Resolver, Query } from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './applicant.model';

@Resolver()
export class ApplicantsResolver {
  constructor(private applicantsService: ApplicantsService) {}

  @Query(() => [Applicant])
  async applicants(): Promise<Applicant[]> {
    return this.applicantsService.applicants();
  }
}
