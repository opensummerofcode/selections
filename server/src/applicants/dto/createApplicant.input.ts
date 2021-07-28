import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateAddressInput } from '../../addresses/dto/createAddress.input';

@InputType()
export class CreateApplicantInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly firstname: string;

  @Field()
  @IsNotEmpty()
  readonly lastname: string;

  @Field({ nullable: true })
  readonly callname?: string;

  @Field()
  @IsNotEmpty()
  readonly gender: string;

  @Field()
  readonly phone?: string;

  @Field()
  readonly nationality?: string;

  @Field()
  readonly address?: CreateAddressInput;

  @Field()
  @IsNotEmpty()
  readonly isAlumni: boolean;
}
