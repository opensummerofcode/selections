import { Field, ObjectType, Int } from '@nestjs/graphql';
import { ISkill } from 'common';

@ObjectType()
export class Skill implements ISkill {
  @Field((type) => Int)
  readonly id: number;

  @Field()
  name: string;
}
