import { Resolver, Query, Args, Mutation, Subscription, ResolveField } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';

@Resolver((of) => Project)
export class ProjectsResolver {
  private pubSub: PubSub;

  constructor(private projectsService: ProjectsService) {
    this.pubSub = new PubSub();
  }

  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Query(() => Project)
  async project(@Args('uuid', { type: () => String }) uuid: string) {
    return this.projectsService.findOneByUuid(uuid);
  }

  @Mutation(() => Project)
  async createProject(@Args('input') createProjectData: CreateProjectInput): Promise<Project> {
    const project = await this.projectsService.create(createProjectData);
    this.pubSub.publish('projectsChanged', { projectsChanged: project });

    return project;
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('uuid', { type: () => String }) uuid: string,
    @Args('input') updateProjectData: UpdateProjectInput
  ): Promise<Project> {
    const project = await this.projectsService.update(uuid, updateProjectData);
    this.pubSub.publish('projectsChanged', { projectsChanged: project });

    return project;
  }

  @Mutation(() => Boolean)
  async deleteProject(@Args('uuid', { type: () => String }) uuid: string): Promise<Boolean> {
    this.projectsService.delete(uuid);
    return true;
  }

  @Subscription((returns) => Project, {
    name: 'projectsChanged'
  })
  addProjectHandler() {
    return this.pubSub.asyncIterator('projectsChanged');
  }
}
