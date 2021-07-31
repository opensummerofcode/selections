import { Field, InputType } from '@nestjs/graphql';
import { Status } from 'common';

@InputType()
export class UpdateSuggestionInput {
  @Field({ nullable: true })
  readonly status?: Status;

  @Field({ nullable: true })
  readonly comment?: string;
}
