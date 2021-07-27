import { IAddress } from './Address';

export type ApplicantStatus = 'ACCEPTED' | 'UNDECIDED' | 'REJECTED';
export interface IApplicant {
  readonly id: number;
  readonly uuid: string;
  email: string;
  firstname: string;
  lastname: string;
  callname?: string;
  gender: string;
  nationality: string;
  address?: IAddress;
  phone: string;
  isAlumni: boolean;
  status: ApplicantStatus;
  createdAt: Date;
  updatedAt: Date;
}
