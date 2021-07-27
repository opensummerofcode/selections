import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { Applicant } from './models/applicant.model';
import { CreateApplicantInput } from './dto/createApplicant.input';
import { UpdateApplicantInput } from './dto/updateApplicant.input';
import { FilterApplicantInput } from './dto/filterApplicant.input';

@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}

  private readonly applicantIncludes = {
    address: true,
    suggestions: {
      include: {
        suggester: true
      }
    },
    projects: {
      include: {
        project: true
      }
    },
    profiles: {
      include: {
        profile: true
      }
    }
  };

  async findAll(where?: FilterApplicantInput): Promise<Applicant[]> {
    const { profiles_every, projects_every, suggestions_every, skills_every, ...whereArgs } =
      where || {};

    //todo: filter parents with more than one condition
    // fix: filter
    // const filter = {
    //   ...whereArgs,
    //   profiles: {
    //     some: { profile: profiles_every }
    //   },
    //   projects: {
    //     some: { project: projects_every }
    //   },
    //   suggestions: {
    //     every: suggestions_every
    //   },
    //   skillset: {
    //     every: { skill: skills_every }
    //   }
    // };

    let applicants = await this.prisma.applicant.findMany({
      include: this.applicantIncludes,
      where: { ...whereArgs }
    });

    // todo refactor
    if (projects_every) applicants = applicants.filter((applicant) => applicant.projects.length);
    if (profiles_every) applicants = applicants.filter((applicant) => applicant.profiles.length);

    return applicants.map((applicant) => {
      return {
        ...applicant,
        projects: applicant.projects.map((projects) => projects.project),
        profiles: applicant.profiles.map((profiles) => profiles.profile)
      };
    });
  }

  async findOneById(id: number): Promise<Applicant> {
    const applicant = await this.prisma.applicant.findUnique({
      where: { id: id },
      include: this.applicantIncludes
    });

    return {
      ...applicant,
      projects: applicant.projects.map((projects) => projects.project),
      profiles: applicant.profiles.map((profiles) => profiles.profile)
    };
  }

  async findOneByUuid(uuid: string): Promise<Applicant> {
    const applicant = await this.prisma.applicant.findFirst({
      where: { uuid: uuid },
      include: this.applicantIncludes
    });

    return {
      ...applicant,
      projects: applicant.projects.map((projects) => projects.project),
      profiles: applicant.profiles.map((profiles) => profiles.profile)
    };
  }

  async create(createApplicantData: CreateApplicantInput): Promise<Applicant> {
    const { address, ...data } = createApplicantData;
    const applicant = await this.prisma.applicant.create({
      data: {
        uuid: uuidv4(),
        ...data,
        address: {
          create: address
        }
      },
      include: this.applicantIncludes
    });

    return {
      ...applicant,
      projects: applicant.projects.map((projects) => projects.project),
      profiles: applicant.profiles.map((profiles) => profiles.profile)
    };
  }

  async update(uuid: string, updateApplicantData: UpdateApplicantInput): Promise<Applicant> {
    const applicant = await this.prisma.applicant.update({
      where: {
        uuid: uuid
      },
      data: {
        ...updateApplicantData,
        address: {
          update: updateApplicantData.address
        }
      },
      include: this.applicantIncludes
    });

    return {
      ...applicant,
      projects: applicant.projects.map((projects) => projects.project),
      profiles: applicant.profiles.map((profiles) => profiles.profile)
    };
  }

  async delete(uuid: string) {
    const applicant = this.findOneByUuid(uuid);

    if (applicant) {
      return await this.prisma.applicant.delete({
        where: { uuid: uuid }
      });
    }

    throw new NotFoundException(`Applicant with uuid ${uuid} cannot be`);
  }

  async addSkill(applicantId: number, skill: string, level: string): Promise<boolean> {
    await this.prisma.applicantSkill.create({
      data: {
        applicant: {
          connect: {
            id: applicantId
          }
        },
        skill: {
          connectOrCreate: {
            where: {
              name: skill
            },
            create: {
              name: skill
            }
          }
        },
        level: {
          connectOrCreate: {
            where: {
              name: level
            },
            create: {
              name: level
            }
          }
        }
      }
    });

    return true;
  }

  async removeSkill(applicantId: number, skillId: number): Promise<boolean> {
    await this.prisma.applicantSkill.delete({
      where: {
        applicantId_skillId: { applicantId, skillId }
      }
    });

    return true;
  }

  async addToProject(applicantId: number, projectId: number): Promise<boolean> {
    await this.prisma.applicantsOnProjects.create({
      data: {
        applicant: {
          connect: { id: applicantId }
        },
        project: {
          connect: { id: projectId }
        }
      }
    });

    return true;
  }

  async removeFromProject(applicantId: number, projectId: number): Promise<boolean> {
    await this.prisma.applicantsOnProjects.delete({
      where: {
        applicantId_projectId: { applicantId, projectId }
      }
    });

    return true;
  }
}
