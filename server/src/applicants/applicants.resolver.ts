import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './models/applicant.model';
import { PubSub } from 'graphql-subscriptions';
import { CreateApplicantInput } from 'src/applicants/dto/createApplicant.input';
import { UpdateApplicantInput } from './dto/updateApplicant.input';

@Resolver((of) => Applicant)
export class ApplicantsResolver {
  private pubSub: PubSub;

  constructor(private applicantsService: ApplicantsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Applicant])
  async applicants(): Promise<Applicant[]> {
    return this.applicantsService.findAll();
  }

  @Query(() => Applicant)
  async applicant(@Args('uuid', { type: () => String }) uuid: string) {
    return this.applicantsService.findOneByUuid(uuid);
  }

  @Mutation(() => Applicant)
  async createApplicant(
    @Args('input') createApplicantData: CreateApplicantInput
  ): Promise<Applicant> {
    const applicant = await this.applicantsService.create(createApplicantData);
    this.pubSub.publish('applicantsChanged', { applicantsChanged: applicant });

    return applicant;
  }

  @Mutation(() => Applicant)
  async updateApplicant(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('input') updateApplicantData: UpdateApplicantInput
  ): Promise<Applicant> {
    const applicant = this.applicantsService.update(uuid, updateApplicantData);
    this.pubSub.publish('applicantsChanged', { applicantsChanged: applicant });

    return applicant;
  }

  @Mutation(() => Applicant)
  async deleteApplicant(@Args('uuid', { type: () => String }) uuid: string): Promise<Applicant> {
    return this.applicantsService.delete(uuid);
  }

  @Subscription((returns) => Applicant, {
    name: 'applicantsChanged'
  })
  addApplicantHandler() {
    return this.pubSub.asyncIterator('applicantsChanged');
  }
}
