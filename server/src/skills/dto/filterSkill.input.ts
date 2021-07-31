import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from '../../lib/stringFilter.input';

@InputType()
export class FilterSkillInput {
  @Field((type) => FilterSkillInput, { nullable: true })
  AND?: FilterSkillInput;

  @Field((type) => FilterSkillInput, { nullable: true })
  OR?: FilterSkillInput;

  @Field((type) => FilterSkillInput, { nullable: true })
  NOT?: FilterSkillInput;

  @Field((type) => StringFilter, { nullable: true })
  name: StringFilter;
}
