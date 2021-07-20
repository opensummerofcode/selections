import { Resolver, Query, Args, Subscription, Mutation } from '@nestjs/graphql';
import { ApplicantsService } from './applicants.service';
import { Applicant } from './models/applicant.model';
import { PubSub } from 'graphql-subscriptions';
import { CreateApplicantInput } from 'src/applicants/dto/createApplicant.input';
import { UpdateApplicantInput } from './dto/updateApplicant.input';
import { CreateAddressInput } from 'src/addresses/dto/createAddress.input';

@Resolver(of => Applicant)
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
  async applicant(@Args('id', { type: () => Number }) id: number) {
    return this.applicantsService.findOneById(id);
  }

  @Query(() => Applicant)
  async aplicant(@Args('uuid', { type: () => String }) uuid: string) {
    return this.applicantsService.findOneByUuid(uuid);
  }

  @Mutation(() => Applicant)
  async createApplicant(@Args('input') createApplicantData: CreateApplicantInput) : Promise<Applicant>{
    return this.applicantsService.create(createApplicantData);
  }

  @Mutation(() => Applicant)
  async updateApplicant(@Args('uuid', { type: () => String }) uuid: string, @Args('input') updateApplicantData: UpdateApplicantInput) : Promise<Applicant>{
    return this.applicantsService.update(uuid, updateApplicantData);
  }

  @Mutation(() => Applicant)
  async deleteApplicant(@Args('uuid', { type: () => String }) uuid: string) : Promise<Applicant>{
    return this.applicantsService.delete(uuid);
  }
}
