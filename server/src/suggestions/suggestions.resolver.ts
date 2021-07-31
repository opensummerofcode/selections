import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateSuggestionInput } from './dto/createSuggestion.input';
import { UpdateSuggestionInput } from './dto/updateSuggestion.input';
import { Suggestion } from './model/suggestion.model';
import { SuggestionsService } from './suggestions.service';

@Resolver((of) => Suggestion)
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

  @Mutation(() => Suggestion)
  async updateSuggestion(
    @Args('id', { type: () => Number }) id: number,
    @Args('input') updateSuggestionData: UpdateSuggestionInput
  ): Promise<Suggestion> {
    return await this.suggestionsService.update(id, updateSuggestionData);
  }

  @Mutation(() => Boolean)
  async deleteSuggestion(@Args('id', { type: () => Number }) id: number): Promise<Boolean> {
    this.suggestionsService.delete(id);
    return true;
  }
}
