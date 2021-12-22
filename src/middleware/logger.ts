import { Request, Response, NextFunction } from 'express';
import { StatusError } from '../common/errors/statusError';
import { LOGGING_LEVEL } from '../common/config';

const INFO_LOG = ['1', '2'];
const ERR_LOG = ['0', '2'];

const loggingLevel = LOGGING_LEVEL ?? '2';

export const log = (err: Error | null, req?: Request, res?: Response) => {
  if (INFO_LOG.includes(loggingLevel) && req && res) {
    console.log(req.method, req.baseUrl, res.statusCode, req.query, req.body);
  }

  if (ERR_LOG.includes(loggingLevel) && err) {
    console.error(err?.name, err?.message, err?.stack);
  }
};

export const logger = (req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    log(null, req, res);
  } else {
    res.on('finish', () => {
      log(null, req, res);
    });
  }

  next();
};
