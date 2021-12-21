import { Request, Response, NextFunction } from 'express';
import { StatusError } from '../common/errors/statusError';

export const errorHandler = (error: StatusError, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  if (!error.status) {
    next(error);
  }

  res.status(error.status ?? 500);
  res.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
};

export const clientErrorHandler = (_: Request, __: Response, next: NextFunction) => {
  next(new StatusError('Not found', 404));
};

export const unhandledErrorHandler = (err: Error) => {
  console.log(err);
  process.exit(1);
};
