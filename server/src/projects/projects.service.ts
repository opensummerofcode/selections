import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateProjectInput } from './dto/createProject.input';
import { UpdateProjectInput } from './dto/updateProject.input';
import { Project } from './models/project.model';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  private readonly projectIncludes = {
    leadCoach: true,
    coaches: {
      include: {
        user: true
      }
    },
    applicants: {
      include: {
        applicant: true
      }
    }
  };

  async findAll(): Promise<Project[]> {
    const projects = await this.prisma.project.findMany({
      include: this.projectIncludes
    });

    return projects.map((project) => {
      return {
        ...project,
        coaches: project.coaches.map((coaches) => coaches.user),
        applicants: project.applicants.map((applicants) => applicants.applicant)
      };
    });
  }

  async findOneById(id: number): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { id: id },
      include: this.projectIncludes
    });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found!`);
    }

    return {
      ...project,
      coaches: project.coaches.map((coaches) => coaches.user),
      applicants: project.applicants.map((applicants) => applicants.applicant)
    };
  }

  async findOneByUuid(uuid: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({
      where: { uuid: uuid },
      include: this.projectIncludes
    });

    if (!project) {
      throw new NotFoundException(`Project with uuid ${uuid} not found!`);
    }

    return {
      ...project,
      coaches: project.coaches.map((coaches) => coaches.user),
      applicants: project.applicants.map((applicants) => applicants.applicant)
    };
  }

  async create(createProjectData: CreateProjectInput): Promise<Project> {
    return this.prisma.project.create({
      data: {
        uuid: uuidv4(),
        name: createProjectData.name,
        description: createProjectData.description,
        client: createProjectData.client,
        templateUrl: createProjectData.templateUrl,
        leadCoach: {
          connect: { id: createProjectData.leadCoachId }
        }
      }
    });
  }

  async update(uuid: string, updateProjectData: UpdateProjectInput): Promise<Project> {
    return this.prisma.project.update({
      where: {
        uuid: uuid
      },
      data: {
        ...updateProjectData
      }
    });
  }

  async delete(uuid: string) {
    const project = this.findOneByUuid(uuid);

    if (project) {
      return await this.prisma.project.delete({
        where: { uuid: uuid }
      });
    }

    throw new NotFoundException(`Project with uuid ${uuid} cannot be`);
  }
}
