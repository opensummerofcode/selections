import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IApplicant } from 'common';
import { Address } from 'src/addresses/models/address.model';
import { Project } from 'src/projects/models/project.model';
import { Suggestion } from 'src/suggestions/model/suggestion.model';

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

  @Field()
  phone: string;

  @Field()
  nationality: string;

  @Field()
  address?: Address;

  @Field()
  isAlumni: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field((type) => [Suggestion], { nullable: true })
  suggestions?: Suggestion[];

  @Field((type) => [Project], { nullable: true })
  projects?: Project[];
}
