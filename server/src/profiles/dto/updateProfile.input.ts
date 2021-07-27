import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsUrl()
  image_url?: string;
}
