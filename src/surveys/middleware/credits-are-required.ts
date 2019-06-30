import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../mongo/models/users';

interface Req extends Request {
  user: IUser;
}

export const creditsAreRequired = (req: Req, res: Response, next: NextFunction) => {
  if (req.user.credits < 1) {
    return res.status(403).send('Not enough credits');
  }

  return next();
};
