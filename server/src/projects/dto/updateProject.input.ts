import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectInput {
  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field({ nullable: true })
  readonly client?: string;

  @Field({ nullable: true })
  readonly templateUrl?: string;

  @Field({ nullable: true })
  readonly leadCoachId?: number;
}
