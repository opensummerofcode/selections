import { Field, ObjectType } from '@nestjs/graphql';
import { IProfile } from 'common';
import { Applicant } from '../../applicants/models/applicant.model';

@ObjectType()
export class Profile implements IProfile {
  @Field()
  readonly id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  image_url?: string;

  @Field((type) => [Applicant], { nullable: true })
  applicants?: Applicant[];
}
