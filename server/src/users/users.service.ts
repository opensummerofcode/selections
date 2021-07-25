import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { UpdateUserInput } from './dto/UpdateUser.input';
import { User } from './models/user.model';
import { IExternalUserInput } from 'common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly userIncludes = {
    leadCoachOn: true,
    coachOn: {
      include: {
        project: true
      }
    }
  };

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: this.userIncludes
    });

    return users.map((user) => {
      return { ...user, coachOn: user.coachOn.map((projects) => projects.project) };
    });
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: this.userIncludes
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }

    return { ...user, coachOn: user.coachOn.map((projects) => projects.project) };
  }

  async findOneByUuid(uuid: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { uuid: uuid },
      include: this.userIncludes
    });

    if (!user) {
      throw new NotFoundException(`User with uuid ${uuid} not found!`);
    }

    return { ...user, coachOn: user.coachOn.map((projects) => projects.project) };
  }

  async findOneByExternalId(externalId: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { externalId }
    });

    if (!user) {
      throw new NotFoundException(`User with external id ${externalId} not found!`);
    }

    return { ...user };
  }

  async createFromExternal(createUserData: IExternalUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        uuid: uuidv4(),
        ...createUserData
      }
    });
  }

  async update(uuid: string, updateUserData: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({
      where: {
        uuid: uuid
      },
      data: {
        ...updateUserData
      }
    });
  }

  async delete(uuid: string) {
    const user = this.findOneByUuid(uuid);

    if (user) {
      return await this.prisma.user.delete({
        where: { uuid: uuid }
      });
    }

    throw new NotFoundException(`User with uuid ${uuid} cannot be`);
  }

  async addToProject(userId: number, projectId: number): Promise<boolean> {
    await this.prisma.usersOnProjects.create({
      data: {
        user: {
          connect: { id: userId }
        },
        project: {
          connect: { id: projectId }
        }
      }
    });

    return true;
  }

  async removeFromProject(userId: number, projectId: number): Promise<boolean> {
    await this.prisma.usersOnProjects.delete({
      where: {
        userId_projectId: { userId, projectId }
      }
    });

    return true;
  }
}
