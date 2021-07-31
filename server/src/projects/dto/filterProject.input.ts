import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from '../../lib/stringFilter.input';

@InputType()
export class FilterProjectInput {
  @Field((type) => FilterProjectInput, { nullable: true })
  AND?: FilterProjectInput;

  @Field((type) => FilterProjectInput, { nullable: true })
  OR?: FilterProjectInput;

  @Field((type) => FilterProjectInput, { nullable: true })
  NOT?: FilterProjectInput;

  @Field((type) => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  client?: string;

  @Field({ nullable: true })
  leadCoachId?: number;
}
