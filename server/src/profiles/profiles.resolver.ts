import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './models/profile.model';
import { CreateProfileInput } from './dto/createProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';
@Resolver()
export class ProfilesResolver {
  constructor(private profilesService: ProfilesService) {}

  @Query(() => [Profile])
  async profiles(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  @Query(() => Profile)
  async profile(@Args('id', { type: () => Number }) id: number) {
    return this.profilesService.findOneById(id);
  }

  @Mutation(() => Profile)
  async createProfile(@Args('input') createProfileData: CreateProfileInput): Promise<Profile> {
    return await this.profilesService.create(createProfileData);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @Args('id', { type: () => Number }) id: number,
    @Args('input') updateProfileData: UpdateProfileInput
  ): Promise<Profile> {
    return await this.profilesService.update(id, updateProfileData);
  }

  @Mutation(() => Boolean)
  async deleteProfile(@Args('id', { type: () => Number }) id: number): Promise<Boolean> {
    this.profilesService.delete(id);
    return true;
  }

  @Mutation(() => Boolean)
  async addProfileToApplicant(
    @Args('applicantId', { type: () => Int }) applicantId: number,
    @Args('profileId', { type: () => Int }) profileId: number
  ) {
    await this.profilesService.addToApplicant(applicantId, profileId);
    return true;
  }

  @Mutation(() => Boolean)
  async removeProfileToApplicant(
    @Args('applicantId', { type: () => Int }) applicantId: number,
    @Args('profileId', { type: () => Int }) profileId: number
  ) {
    await this.profilesService.removeFromApplicant(applicantId, profileId);
    return true;
  }

  @Mutation(() => Boolean)
  async addProfileToProject(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('profileId', { type: () => Int }) profileId: number
  ) {
    await this.profilesService.addToProject(projectId, profileId);
    return true;
  }

  @Mutation(() => Boolean)
  async removeProfileToProject(
    @Args('projectId', { type: () => Int }) projectId: number,
    @Args('profileId', { type: () => Int }) profileId: number
  ) {
    await this.profilesService.removeFromProject(projectId, profileId);
    return true;
  }
}
