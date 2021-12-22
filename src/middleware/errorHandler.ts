import { Request, Response, NextFunction } from 'express';
import { ClientError } from '../common/errors/clientError';
import { log } from './logger';

export const errorHandler = (error: ClientError, _: Request, res: Response, next: NextFunction) => {
  log(error);

  if (res.headersSent) {
    return;
  }

  res.status(error.status ?? 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

export const clientErrorHandler = (_: Request, __: Response, next: NextFunction) => {
  next(new ClientError('Not found', 404));
};

export const unhandledErrorHandler = (err: Error) => {
  log(err);
  process.exit(1);
};
