import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProfileInput } from './dto/createProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { Profile } from './models/profile.model';

@Injectable()
export class ProfilesService {
  private readonly profileIncludes = {
    applicants: {
      include: {
        applicant: true
      }
    }
  };
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Profile[]> {
    const profiles = await this.prisma.profile.findMany({
      include: this.profileIncludes,
      
    });

    return profiles.map((profile) => {
      return {
        ...profile,
        applicants: profile.applicants.map((applicants) => applicants.applicant)
      };
    });
  }

  async findOneById(id: number): Promise<Profile> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: id },
      include: this.profileIncludes
    });

    return {
      ...profile,
      applicants: profile.applicants.map((applicants) => applicants.applicant)
    };
  }

  async create(createProfileData: CreateProfileInput): Promise<Profile> {
    return this.prisma.profile.create({
      data: { ...createProfileData }
    });
  }

  async update(id: number, updateProfileData: UpdateProfileInput): Promise<Profile> {
    return this.prisma.profile.update({
      where: {
        id: id
      },
      data: {
        ...updateProfileData
      }
    });
  }

  async delete(id: number) {
    const profile = this.findOneById(id);

    if (profile) {
      return await this.prisma.profile.delete({
        where: { id: id }
      });
    }

    throw new NotFoundException(`Profile with id ${id} cannot be`);
  }

  async addToApplicant(applicantId: number, profileId: number): Promise<Boolean> {
    await this.prisma.applicantProfile.create({
      data: {
        applicant: {
          connect: { id: applicantId }
        },
        profile: {
          connect: { id: profileId }
        }
      }
    });

    return true;
  }

  async removeFromApplicant(applicantId: number, profileId: number): Promise<Boolean> {
    await this.prisma.applicantProfile.delete({
      where: {
        applicantId_profileId: { applicantId, profileId }
      }
    });

    return true;
  }
}
