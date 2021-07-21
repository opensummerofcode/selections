import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Status } from 'common';
import { Applicant } from 'src/applicants/models/applicant.model';

@InputType()
export class CreateSuggestionInput {
  @Field()
  @IsNotEmpty()
  readonly status: Status;

  @Field()
  @IsNotEmpty()
  readonly comment: string;

  @Field()
  applicantId: number;

  @Field()
  suggesterId: number;
}
