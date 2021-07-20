import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ISuggestion, Status } from 'common';
import { Applicant } from 'src/applicants/models/applicant.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Suggestion implements ISuggestion {
  @Field((type) => Int)
  id: number;

  @Field()
  status: Status;

  @Field()
  comment: string;

  @Field((type) => Applicant)
  applicant?: Applicant;

  @Field((type) => User)
  suggester?: User;
}
