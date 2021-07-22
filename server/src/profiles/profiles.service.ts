import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProfileInput } from './dto/createProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Profile[]> {
    return await this.prisma.profile.findMany();
  }

  async findOneById(id: number): Promise<Profile> {
    return await this.prisma.profile.findUnique({
      where: { id: id }
    });
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
}
