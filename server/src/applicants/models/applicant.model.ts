import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ApplicantStatus, IApplicant } from 'common';
import { Skillset } from 'src/skills/models/skillset.model';
import { Address } from '../../addresses/models/address.model';
import { Profile } from '../../profiles/models/profile.model';
import { Project } from '../../projects/models/project.model';
import { Suggestion } from '../../suggestions/model/suggestion.model';

@ObjectType()
export class Applicant implements IApplicant {
  @Field((type) => Int)
  id: number;

  @Field()
  uuid: string;

  @Field()
  email: string;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field({ nullable: true })
  callname?: string;

  @Field()
  gender: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  nationality?: string;

  @Field({ nullable: true })
  address?: Address;

  @Field()
  isAlumni: boolean;

  @Field()
  status: ApplicantStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => [Suggestion], { nullable: true })
  suggestions?: Suggestion[];

  @Field((type) => [Project], { nullable: true })
  projects?: Project[];

  @Field((type) => [Profile], { nullable: true })
  profiles?: Profile[];

  @Field((type) => [Skillset], { nullable: true })
  skillset?: Skillset[];
}
