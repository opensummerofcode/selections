export type ApplicantStatus = 'UNDECIDED' | 'YES' | 'MAYBE' | 'NO';

export interface IApplicant {
  readonly id: number;
  readonly uuid: string;
  email: string;
  lastname: string;
  callname?: string;
  gender: string;
  nationality: string;
  phone: string;
  isAlumni: boolean;
  createdAt: Date;
  updatedAt: Date;
}