import { Resolver, Query, Args } from '@nestjs/graphql';
import { Skill } from './models/skill.model';
import { SkillsService } from './skills.service';

@Resolver((of) => Skill)
export class SkillsResolver {
  constructor(private skillsService: SkillsService) {}

  @Query(() => [Skill])
  async skills(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Query(() => Skill)
  async skill(@Args('id', { type: () => Number }) id: number) {
    return this.skillsService.findOneById(id);
  }
}
