import { Request, Response, NextFunction } from 'express';
import { StatusError } from '../common/errors/statusError';

const log = (req: Request, res: Response) => {
  console.log(req.method, req.baseUrl, res.statusCode, req.query, req.body);
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    log(req, res);
  } else {
    res.on('finish', () => {
      log(req, res);
    });
  }

  next();
};
