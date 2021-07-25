import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IUser, Role } from 'common';
import { Project } from '../../projects/models/project.model';

@ObjectType()
export class User implements IUser {
  @Field((type) => Int)
  id: number;

  @Field()
  uuid: string;

  @Field({ nullable: true })
  externalId: string;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field({ nullable: true })
  firstname: string;

  @Field({ nullable: true })
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
