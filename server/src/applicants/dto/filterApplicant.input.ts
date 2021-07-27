import { Field, InputType } from '@nestjs/graphql';
import { FilterAddressInput } from '../../addresses/dto/filterAddress.input';
import { FilterProfileInput } from '../../profiles/dto/filterProfile.input';
import { FilterProjectInput } from '../../projects/dto/filterProject.input';
import { FilterSuggestionInput } from '../../suggestions/dto/filterSuggestion.input';
import { StringFilter } from '../../helpers/stringFilter.input';
import { FilterSkillInput } from '../../skills/dto/filterSkill.input';

@InputType()
export class FilterApplicantInput {
  @Field((type) => [FilterApplicantInput], { nullable: true })
  AND?: FilterApplicantInput[];

  @Field((type) => [FilterApplicantInput], { nullable: true })
  OR?: FilterApplicantInput[];

  @Field((type) => [FilterApplicantInput], { nullable: true })
  NOT?: FilterApplicantInput[];

  @Field((type) => StringFilter, { nullable: true })
  email?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  firstname?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  lastname?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  callname?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  gender?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  phone?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  nationality?: StringFilter;

  @Field((type) => FilterAddressInput, { nullable: true })
  address?: FilterAddressInput;

  @Field({ nullable: true })
  isAlumni?: boolean;

  @Field((type) => FilterProfileInput, { nullable: true })
  profiles_every?: FilterProfileInput;

  @Field((type) => FilterProjectInput, { nullable: true })
  projects_every?: FilterProjectInput;

  @Field((type) => FilterSuggestionInput, { nullable: true })
  suggestions_every?: FilterSuggestionInput;

  @Field((type) => FilterSkillInput, { nullable: true })
  skills_every?: FilterSkillInput;
}
