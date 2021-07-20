import { Field, ObjectType, Int } from '@nestjs/graphql';
import { IAddress } from 'common';

@ObjectType()
export class Address implements IAddress {
    @Field(type => Int)
    id: number;

    @Field()
    addressLine: string;

    @Field()
    postalCode: string;

    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    country: string;
}
