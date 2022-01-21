import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import util from 'util';
import { ClientError } from '../common/errors/clientError';

const verify = util.promisify(jwt.verify);

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    try {
      await verify(req.headers.authorization.split(' ')[1]);
      next();
    } catch {
      next(new ClientError('Unauthorized', 401));
    }
  }

  next(new ClientError('Unauthorized', 401));
};
