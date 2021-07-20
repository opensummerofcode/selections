import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field()
  @IsNotEmpty()
  readonly addressLine: string;

  @Field()
  @IsNotEmpty()
  readonly postalCode: string;

  @Field()
  @IsNotEmpty()
  readonly city: string;

  @Field()
  @IsNotEmpty()
  readonly state: string;

  @Field()
  @IsNotEmpty()
  readonly country: string;
}
