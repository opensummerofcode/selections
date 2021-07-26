import { Request, Response } from 'express';
import { User } from '../users/models/user.model';

type Ctx = {
  req: Request & { user?: Pick<User, 'id'> };
  res: Response;
};

export default Ctx;
