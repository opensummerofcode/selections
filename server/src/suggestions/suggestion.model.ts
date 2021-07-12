import { ObjectType } from '@nestjs/graphql';
import { ISuggestion } from 'common';

@ObjectType()
export class Suggestion implements ISuggestion {}
