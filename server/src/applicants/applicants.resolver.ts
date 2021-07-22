import { Resolver, Query, Args, Subscription, Mutation, Int } from '@nestjs/graphql';
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

  @Mutation(() => Boolean)
  async deleteApplicant(@Args('uuid', { type: () => String }) uuid: string): Promise<Boolean> {
    this.applicantsService.delete(uuid);
    return true;
  }

  @Mutation(() => Boolean)
  async addApplicantToProject(
    @Args('applicantId', { type: () => Int }) applicantId: number,
    @Args('projectId', { type: () => Int }) projectId: number
  ) {
    await this.applicantsService.addToProject(applicantId, projectId);
    return true;
  }

  @Mutation(() => Boolean)
  async removeApplicantFromProject(
    @Args('applicantId', { type: () => Int }) applicantId: number,
    @Args('projectId', { type: () => Int }) projectId: number
  ) {
    await this.applicantsService.removeFromProject(applicantId, projectId);
    return true;
  }

  @Subscription((returns) => Applicant, {
    name: 'applicantsChanged'
  })
  addApplicantHandler() {
    return this.pubSub.asyncIterator('applicantsChanged');
  }
}
