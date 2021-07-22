import { Field, InputType } from '@nestjs/graphql';
import { IsUrl } from 'class-validator';
@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  readonly name?: string;

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
