import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { IsUrl } from 'class-validator';
@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field({ nullable: true })
  readonly client?: string;

  @Field({ nullable: true })
  @IsUrl()
  readonly templateUrl?: string;

  @Field({ nullable: true })
  readonly leadCoachId?: number;
}
