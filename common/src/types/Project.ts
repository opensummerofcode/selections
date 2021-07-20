import { IUser } from './User';

export interface IProject {
  readonly id: number;
  readonly uuid: string;
  name: string;
  description: string;
  client: string;
  template_url?: string;
  leadCoach?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
