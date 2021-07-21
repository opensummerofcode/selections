import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateSuggestionInput } from './dto/createSuggestion.input';
import { Suggestion } from './model/suggestion.model';
import { SuggestionsService } from './suggestions.service';

@Resolver()
export class SuggestionsResolver {
  constructor(private suggestionsService: SuggestionsService) {}

  @Query(() => [Suggestion])
  async suggestions(): Promise<Suggestion[]> {
    return this.suggestionsService.findAll();
  }

  async suggestion(@Args('id', { type: () => Number }) id: number) {
    return this.suggestionsService.findOneById(id);
  }

  @Mutation(() => Suggestion)
  async createSuggestion(
    @Args('input') createSuggestionData: CreateSuggestionInput
  ): Promise<Suggestion> {
    return await this.suggestionsService.create(createSuggestionData);
  }
}
