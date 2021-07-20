import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail } from "class-validator";
import { UpdateAddressInput } from 'src/addresses/dto/updateAdress.input';

@InputType()
export class UpdateApplicantInput {
    @Field({ nullable: true })
    @IsEmail()
    readonly email?: string;
    
    @Field({ nullable: true })
    readonly firstname?: string;

    @Field({ nullable: true })
    readonly lastname?: string;

    @Field({ nullable: true })
    readonly callname?: string;

    @Field({ nullable: true })
    readonly gender?: string;

    @Field({ nullable: true })
    readonly phone?: string;

    @Field({ nullable: true })
    readonly nationality?: string;

    @Field({ nullable: true })
    readonly address?: UpdateAddressInput;

    @Field({ nullable: true })
    readonly isAlumni?: boolean;
}
