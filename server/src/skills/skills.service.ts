import { Injectable } from '@nestjs/common';
import { Project } from '../projects/models/project.model';
import { Applicant } from '../applicants/models/applicant.model';
import { PrismaService } from '../prisma.service';
import { Skill } from './models/skill.model';
import { Skillset } from './models/skillset.model';

@Injectable()
export class SkillsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Skill[]> {
    return this.prisma.skill.findMany();
  }

  async findOneById(id: number): Promise<Skill> {
    return this.prisma.skill.findUnique({
      where: {
        id: id
      }
    });
  }

  async findApplicantSkills(applicant: Applicant): Promise<Skillset[]> {
    const { id } = applicant;

    const skillsets = await this.prisma.applicantSkill.findMany({
      where: {
        applicantId: id
      },
      include: {
        skill: true,
        level: true
      }
    });

    return skillsets.map((skillset) => {
      return {
        id: skillset.skill.id,
        name: skillset.skill.name,
        level: skillset.level.name
      };
    });
  }

  async findProjectSkills(project: Project): Promise<Skill[]> {
    const { id } = project;

    const skillsets = await this.prisma.projectSkill.findMany({
      where: {
        projectId: id
      },
      include: {
        skill: true
      }
    });

    return skillsets.map((skillset) => {
      return {
        id: skillset.skill.id,
        name: skillset.skill.name
      };
    });
  }
}
