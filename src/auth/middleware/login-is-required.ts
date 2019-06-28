import { NextFunction, Request, Response } from 'express';

interface Req extends Request {
  user: any;
}

export const loginIsRequired = (req: Req, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).send('Login is required');
  }

  return next();
};
