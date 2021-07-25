export type Role = 'USER' | 'COACH' | 'ADMIN';

export interface IUser {
  readonly id: number;
  readonly uuid?: string;
  email: string;
  displayName: string;
  firstname?: string;
  lastname?: string;
  imageUrl?: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExternalUserInput {
  readonly externalId: string;
  email: string;
  displayName: string;
  imageUrl: string;
}
