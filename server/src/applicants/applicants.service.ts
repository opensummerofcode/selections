import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { Applicant } from './models/applicant.model';
import { CreateApplicantInput } from 'src/applicants/dto/createApplicant.input';
import { UpdateApplicantInput } from './dto/updateApplicant.input';
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
    }
  };

  async findAll(): Promise<Applicant[]> {
    const applicants = await this.prisma.applicant.findMany({
      include: this.applicantIncludes
    });

    return applicants.map((applicant) => {
      return { ...applicant, projects: applicant.projects.map((projects) => projects.project) };
    });
  }

  async findOneById(id: number): Promise<Applicant> {
    const applicant = await this.prisma.applicant.findUnique({
      where: { id: id },
      include: this.applicantIncludes
    });

    return { ...applicant, projects: applicant.projects.map((projects) => projects.project) };
  }

  async findOneByUuid(uuid: string): Promise<Applicant> {
    const applicant = await this.prisma.applicant.findFirst({
      where: { uuid: uuid },
      include: this.applicantIncludes
    });

    return { ...applicant, projects: applicant.projects.map((projects) => projects.project) };
  }

  async create(createApplicantData: CreateApplicantInput): Promise<Applicant> {
    return this.prisma.applicant.create({
      data: {
        uuid: uuidv4(),
        email: createApplicantData.email,
        firstname: createApplicantData.firstname,
        lastname: createApplicantData.lastname,
        callname: createApplicantData.callname,
        gender: createApplicantData.gender,
        nationality: createApplicantData.nationality,
        phone: createApplicantData.phone,
        isAlumni: createApplicantData.isAlumni,
        address: {
          create: createApplicantData.address
        }
      }
    });
  }

  async update(uuid: string, updateApplicantData: UpdateApplicantInput): Promise<Applicant> {
    return this.prisma.applicant.update({
      where: {
        uuid: uuid
      },
      data: {
        ...updateApplicantData,
        address: {
          update: updateApplicantData.address
        }
      }
    });
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

  async addToProject(applicantId: number, projectId: number): Promise<Boolean> {
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

  async removeFromProject(applicantId: number, projectId: number): Promise<Boolean> {
    await this.prisma.applicantsOnProjects.delete({
      where: {
        applicantId_projectId: { applicantId, projectId }
      }
    });

    return true;
  }
}
