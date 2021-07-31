import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Status } from 'common';

@InputType()
export class CreateSuggestionInput {
  @Field()
  @IsNotEmpty()
  readonly status: Status;

  @Field()
  @IsNotEmpty()
  readonly comment: string;

  @Field()
  applicantId: number;

  @Field()
  suggesterId: number;
}
