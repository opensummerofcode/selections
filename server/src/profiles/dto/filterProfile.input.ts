import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from '../../lib/stringFilter.input';

@InputType()
export class FilterProfileInput {
  @Field((type) => [FilterProfileInput], { nullable: true })
  AND?: FilterProfileInput[];

  @Field((type) => [FilterProfileInput], { nullable: true })
  OR?: FilterProfileInput[];

  @Field((type) => [FilterProfileInput], { nullable: true })
  NOT?: FilterProfileInput[];

  @Field((type) => StringFilter, { nullable: true })
  name: StringFilter;
}
