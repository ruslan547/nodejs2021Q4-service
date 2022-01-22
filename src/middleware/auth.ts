import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../common/config';
import { ClientError } from '../common/errors/clientError';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    if (!PRIVATE_KEY) {
      next(new Error('PRIVATE_KEY is miss'));
      return;
    }

    jwt.verify(req.headers.authorization.split(' ')[1], PRIVATE_KEY, (err) => {
      if (err) {
        next(new ClientError('Unauthorized', 401));
        return;
      }

      next();
    });
  } else {
    next(new ClientError('Unauthorized', 401));
  }
};
