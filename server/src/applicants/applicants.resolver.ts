import {
  Resolver,
  Query,
  Args,
  Subscription,
  Mutation,
  Int,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './models/applicant.model';
import { PubSub } from 'graphql-subscriptions';
import { CreateApplicantInput } from './dto/createApplicant.input';
import { UpdateApplicantInput } from './dto/updateApplicant.input';
import { SkillsService } from '../skills/skills.service';
@Resolver((of) => Applicant)
export class ApplicantsResolver {
  private pubSub: PubSub;

  constructor(private applicantsService: ApplicantsService, private skillsService: SkillsService) {
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

  @ResolveField()
  async skillset(@Parent() applicant: Applicant) {
    return this.skillsService.findApplicantSkills(applicant);
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
    const applicant = await this.applicantsService.update(uuid, updateApplicantData);
    this.pubSub.publish('applicantsChanged', { applicantsChanged: applicant });

    return applicant;
  }

  @Mutation(() => Boolean)
  async deleteApplicant(@Args('uuid', { type: () => String }) uuid: string): Promise<boolean> {
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

  // test
  @Mutation(() => Boolean)
  async addSkillToApplicant(
    @Args('applicantId', { type: () => Int }) applicantId: number,
    @Args('skill', { type: () => String }) skill: string,
    @Args('level', { type: () => String }) level: string
  ) {
    await this.applicantsService.addSkill(applicantId, skill, level);
    return true;
  }

  @Subscription((returns) => Applicant, {
    name: 'applicantsChanged'
  })
  addApplicantHandler() {
    return this.pubSub.asyncIterator('applicantsChanged');
  }
}
