import { Field, ObjectType } from '@nestjs/graphql';
import { IProfile } from 'common';

@ObjectType()
export class Profile implements IProfile {
  @Field()
  readonly id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  image_url?: string;
}
