import { Test, TestingModule } from '@nestjs/testing';
import { SuggestionsResolver } from './suggestions.resolver';

describe('SuggestionsResolver', () => {
  let resolver: SuggestionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuggestionsResolver],
    }).compile();

    resolver = module.get<SuggestionsResolver>(SuggestionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
