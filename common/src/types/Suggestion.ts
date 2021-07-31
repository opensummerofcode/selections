import { IApplicant } from './Applicant';
import { IUser } from './User';

export type Status = 'YES' | 'MAYBE' | 'NO';
export interface ISuggestion {
  readonly id: number;
  status: Status;
  comment: string;
  applicant?: IApplicant;
  suggester?: IUser;
}
