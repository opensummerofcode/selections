import { ObjectType, Field, ID } from '@nestjs/graphql';
import { IApplicant, ApplicantStatus } from 'common';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType()
export class Applicant implements IApplicant {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => graphqlTypeJson, { nullable: true })
  response: any;

  @Field()
  status: ApplicantStatus;
}
