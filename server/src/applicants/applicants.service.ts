import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { Applicant } from './models/applicant.model';
import { CreateApplicantInput } from 'src/applicants/dto/createApplicant.input';
import { UpdateApplicantInput } from './dto/updateApplicant.input';
@Injectable()
export class ApplicantsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Applicant[]> {
    return this.prisma.applicant.findMany({
      include: {
        address: true,
        suggestions: true
      }
    });
  }

  async findOneById(id: number): Promise<Applicant> {
    return this.prisma.applicant.findUnique({
      where: { id: id },
      include: {
        address: true,
        suggestions: true
      }
    });
  }

  async findOneByUuid(uuid: string): Promise<Applicant> {
    return this.prisma.applicant.findFirst({
      where: { uuid: uuid },
      include: {
        address: true,
        suggestions: true
      }
    });
  }

  // async create(createApplicantData: CreateApplicantInput, createAddressData: CreateAddressInput): Promise<Applicant> {
  //   return this.prisma.applicant.create({
  //     data: {
  //       uuid: uuidv4(),
  //       ...createApplicantData,
  //       address: {
  //         create: createAddressData
  //       }
  //     }
  //   });
  // }

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
          create: createApplicantData['address']
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
          update: updateApplicantData['address']
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
}
