import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IProject } from 'common';
import { Applicant } from 'src/applicants/models/applicant.model';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Project implements IProject {
  @Field((type) => Int)
  id: number;

  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  client?: string;

  @Field({ nullable: true })
  templateUrl?: string;

  @Field((type) => User, { nullable: true })
  leadCoach?: User;

  @Field((type) => [User], { nullable: true })
  coaches?: User[];

  @Field((type) => [Applicant], { nullable: true })
  applicants?: Applicant[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
