import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from 'common';

@InputType()
export class CreateUserInput {
    @Field()
    @IsEmail()
    readonly email: string;
    
    @Field()
    @IsNotEmpty()
    readonly firstname: string;

    @Field()
    @IsNotEmpty()
    readonly lastname: string;

    @Field({ nullable: true })
    readonly imageUrl?: string;

    @Field({ nullable: true })
    readonly role?: Role;
}
