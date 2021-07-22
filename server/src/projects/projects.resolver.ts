import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { Project } from './models/project.model';
import { ProjectsService } from './projects.service';

@Resolver((of) => Project)
export class ProjectsResolver {

    constructor(private projectsService: ProjectsService) {}
  
    @Query(() => [Project])
    async projects(): Promise<Project[]> {
      return this.projectsService.findAll();
    }
  
    @Query(() => Project)
    async project(@Args('uuid', { type: () => String }) uuid: string) {
      return this.projectsService.findOneByUuid(uuid);
    }
  
    @Mutation(() => Project)
    async createProject(
      @Args('input') createProjectData: CreateProjectInput
    ): Promise<Project> {
        return await this.projectsService.create(createProjectData);
    }
  
    @Mutation(() => Project)
    async updateProject(
      @Args('uuid', { type: () => String }) uuid: string,
      @Args('input') updateProjectData: UpdateProjectInput
    ): Promise<Project> {
        return this.projectsService.update(uuid, updateProjectData);
    }
  
    @Mutation(() => Boolean)
    async deleteProject(@Args('uuid', { type: () => String }) uuid: string): Promise<Boolean> {
      this.projectsService.delete(uuid);
      return true
    }
}
