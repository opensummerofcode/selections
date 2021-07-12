import { Resolver } from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './applicant.model';

@Resolver()
export class ApplicantsResolver {
  constructor(private applicantsService: ApplicantsService) {}

  applicants(): Promise<Applicant[]> {}
}
