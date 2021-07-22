import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  image_url?: string;
}
