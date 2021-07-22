import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  image_url?: string;
}
