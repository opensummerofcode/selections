import { Field, InputType } from '@nestjs/graphql';
import { Status } from '../../../../common/dist';
import { StringFilter } from '../../lib/stringFilter.input';

@InputType()
export class FilterSuggestionInput {
  @Field((type) => FilterSuggestionInput, { nullable: true })
  AND?: FilterSuggestionInput;

  @Field((type) => FilterSuggestionInput, { nullable: true })
  OR?: FilterSuggestionInput;

  @Field((type) => FilterSuggestionInput, { nullable: true })
  NOT?: FilterSuggestionInput;

  @Field((type) => StringFilter, { nullable: true })
  status: Status;
}
