import { Request, Response, NextFunction } from 'express';
import { appendFile } from 'fs';
import { LOGGING_LEVEL } from '../common/config';
import { ClientError } from '../common/errors/clientError';

const INFO_LOG = ['1', '2'];
const ERR_LOG = ['0', '1', '2'];

const loggingLevel = LOGGING_LEVEL ?? '2';

const writeFile = (file: string, text: string) => {
  appendFile(file, `${text}\n`, (error) => {
    if (error) {
      console.error(error);
    }
  });
};

const getLogText = (req: Request, res: Response): string => {
  const { method, baseUrl, url, query, body } = req;
  const urlStr = baseUrl || url || '/';
  const codeStr = res.statusCode ?? 500;
  const queryStr = Object.entries(query)
    .map(([key, value]) => `&${key}=${value?.toString()}`)
    .join('');
  const bodyStr = Object.entries(body)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')
    .slice(0, -1);

  return `${method} ${urlStr} ${codeStr} ${queryStr} ${bodyStr}`;
};

const getErrorLogText = (err: ClientError): string => {
  const { name, status, message, stack } = err;
  const text = `${name} ${status ?? ''} ${message ?? ''}`;

  return stack || text;
};

export const log = (err: ClientError | null, req?: Request, res?: Response) => {
  if (INFO_LOG.includes(loggingLevel) && req && res) {
    const logText = getLogText(req, res);

    console.log(logText);
    writeFile('logfile.txt', logText);
  }

  if (ERR_LOG.includes(loggingLevel) && err) {
    const logText = getErrorLogText(err);

    console.error(logText);
    writeFile('error-logfile.txt', logText);
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
