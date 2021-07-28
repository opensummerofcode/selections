import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from '../../lib/stringFilter.input';

@InputType()
export class FilterAddressInput {
  @Field((type) => FilterAddressInput, { nullable: true })
  AND?: FilterAddressInput;

  @Field((type) => FilterAddressInput, { nullable: true })
  OR?: FilterAddressInput;

  @Field((type) => FilterAddressInput, { nullable: true })
  NOT?: FilterAddressInput;

  @Field((type) => StringFilter, { nullable: true })
  addressLine?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  postalCode?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  city?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  state?: StringFilter;

  @Field((type) => StringFilter, { nullable: true })
  country?: StringFilter;
}
