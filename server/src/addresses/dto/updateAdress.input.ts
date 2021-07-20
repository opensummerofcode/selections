import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateAddressInput {
    @Field({ nullable: true })
    readonly addressLine?: string;

    @Field({ nullable: true })
    readonly postalCode?: string;

    @Field({ nullable: true })
    readonly city?: string;

    @Field({ nullable: true })
    readonly state?: string;

    @Field({ nullable: true })
    readonly country?: string;
}
