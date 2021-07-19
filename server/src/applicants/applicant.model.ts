import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IApplicant } from 'common';

@ObjectType()
export class Applicant implements IApplicant {
    @Field(type => Int)
    id: number;

    @Field()
    uuid: string;

    @Field()
    email: string;

    @Field()
    lastname: string;

    @Field()
    callname?: string;

    @Field()
    gender: string;

    @Field()
    phone: string;

    @Field()
    nationality: string;

    @Field()
    isAlumni: boolean;

    @Field(type => String)
    createdAt: Date;
    
    updatedAt: Date;
}
