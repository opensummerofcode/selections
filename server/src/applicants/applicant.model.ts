import { ObjectType, registerEnumType } from '@nestjs/graphql';
import { IApplicant, ApplicantStatus } from 'common';

registerEnumType(ApplicantStatus, {
  name: 'ApplicantStatus',
  description: 'Applicant status'
});

@ObjectType()
export class Applicant implements IApplicant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  response: any;
  status: ApplicantStatus;
}
