import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IUser, Role } from 'common';

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

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
