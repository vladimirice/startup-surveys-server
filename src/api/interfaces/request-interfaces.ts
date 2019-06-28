import { Request } from 'express';
import { IUser } from '../../mongo/models/users';

interface IRequestWithUser extends Request {
  user: IUser;
}

export {
  IRequestWithUser,
};
