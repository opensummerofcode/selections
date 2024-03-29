import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IProject } from 'common';
import { Profile } from '../../profiles/models/profile.model';
import { Applicant } from '../../applicants/models/applicant.model';
import { User } from '../../users/models/user.model';
import { Skill } from '../../skills/models/skill.model';

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

  @Field((type) => [Profile], { nullable: true })
  profiles?: Profile[];

  @Field((type) => [Skill], { nullable: true })
  skills?: Skill[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
