import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from "class-validator";
import { Role } from 'common';

@InputType()
export class UpdateUserInput {
    @Field()
    @IsEmail()
    readonly email?: string;
    
    @Field({ nullable: true })
    readonly firstname?: string;

    @Field({ nullable: true })
    readonly lastname?: string;

    @Field({ nullable: true })
    readonly imageUrl?: string;

    @Field({ nullable: true })
    readonly role?: Role;
}
