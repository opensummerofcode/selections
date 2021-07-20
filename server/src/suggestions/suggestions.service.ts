import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSuggestionInput } from './dto/createSuggestion.input';
import { UpdateSuggestionInput } from './dto/updateSuggestion.input';
import { Suggestion } from './model/suggestion.model';

@Injectable()
export class SuggestionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Suggestion[]> {
    return this.prisma.suggestion.findMany({
      include: {
        applicant: true,
        suggester: true
      }
    });
  }

  async findOneById(id: number): Promise<Suggestion> {
    return this.prisma.suggestion.findUnique({
      where: { id: id },
      include: {
        applicant: true,
        suggester: true
      }
    });
  }

  async create(createSuggestionData: CreateSuggestionInput): Promise<Suggestion> {
    return this.prisma.suggestion.create({
      data: {
        comment: createSuggestionData.comment,
        status: createSuggestionData.status,
        applicant: {
          connect: { id: createSuggestionData.applicantId }
        },
        suggester: {
          connect: { id: createSuggestionData.suggesterId }
        }
      }
    });
  }

  async update(id: number, updateSuggestionData: UpdateSuggestionInput): Promise<Suggestion> {
    return this.prisma.suggestion.update({
      where: {
        id: id
      },
      data: {
        ...updateSuggestionData
      }
    });
  }

  async delete(id: number) {
    const suggestion = this.findOneById(id);

    if (suggestion) {
      return await this.prisma.suggestion.delete({
        where: { id: id }
      });
    }

    throw new NotFoundException(`Suggestion with id ${id} cannot be`);
  }
}
