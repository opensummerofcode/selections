import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateSuggestionInput } from './dto/createSuggestion.input';
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
}
