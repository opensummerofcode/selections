import { Module } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { SuggestionsResolver } from './suggestions.resolver';
import { PrismaModule } from '../prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SuggestionsService, SuggestionsResolver]
})
export class SuggestionsModule {}
