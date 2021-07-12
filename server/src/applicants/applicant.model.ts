import { ObjectType } from '@nestjs/graphql';
import { IApplicant, ApplicantStatus } from 'common';

@ObjectType()
export class Applicant implements IApplicant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  response: any;
  status: ApplicantStatus;
}
