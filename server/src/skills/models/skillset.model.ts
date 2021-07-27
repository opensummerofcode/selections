import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class Skillset {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  level: string;
}
