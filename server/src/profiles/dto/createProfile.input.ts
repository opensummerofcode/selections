import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  @IsUrl()
  image_url?: string;
}
