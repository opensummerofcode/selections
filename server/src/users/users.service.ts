import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { PrismaService } from '../prisma.service';
import { CreateUserInput } from './dto/CreateUser.input';
import { UpdateUserInput } from './dto/UpdateUser.input';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ 
      where: { id: id }
    });
  }

  async findOneByUuid(uuid: string): Promise<User> {
    return this.prisma.user.findFirst({ 
      where: { uuid: uuid }
    });
  }

  async create(createUserData: CreateUserInput): Promise<User> {
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
        ...updateUserData,
      }
    });
  }


  async delete(uuid: string) {
    const user = this.findOneByUuid(uuid);

    if (user) {
      return await this.prisma.user.delete({
        where: {uuid: uuid}
      });
    }

    throw new NotFoundException(`User with uuid ${uuid} cannot be`);
  }
}
