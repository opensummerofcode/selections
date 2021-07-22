import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IUser, Role } from 'common';
import { Project } from '../../projects/models/project.model';

@ObjectType()
export class User implements IUser {
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

  @Field()
  imageUrl?: string;

  @Field()
  role: Role;

  @Field((type) => [Project], { nullable: true })
  leadCoachOn?: Project[];

  @Field((type) => [Project], { nullable: true })
  coachOn?: Project[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
