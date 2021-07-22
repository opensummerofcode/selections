import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field({ nullable: true })
  readonly client?: string;

  @Field({ nullable: true })
  readonly templateUrl?: string;

  @Field({ nullable: true })
  readonly leadCoachId?: number;
}
