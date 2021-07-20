import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IProject } from 'common';
import { User } from 'src/users/models/user.model';

@ObjectType()
export class Project implements IProject {
  @Field((type) => Int)
  id: number;

  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  client: string;

  @Field({ nullable: true })
  template_url?: string;

  @Field()
  leadCoach?: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
