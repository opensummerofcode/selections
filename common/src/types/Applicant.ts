export type ApplicantStatus = 'UNDECIDED' | 'YES' | 'MAYBE' | 'NO';

export interface IApplicant {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  response: any;
  status: ApplicantStatus;
}
