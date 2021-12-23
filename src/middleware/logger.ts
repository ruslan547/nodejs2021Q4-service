import { Request, Response, NextFunction } from 'express';
import { appendFile } from 'fs';
import { stderr, stdout } from 'process';
import { LOGGING_LEVEL } from '../common/config';
import { ClientError } from '../common/errors/clientError';

const INFO_LOG = ['1', '2'];
const ERR_LOG = ['0', '1', '2'];

const loggingLevel = LOGGING_LEVEL ?? '2';

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

  return `${method} ${urlStr} ${codeStr} ${queryStr} ${bodyStr}\n`;
};

const getErrorLogText = (err: ClientError): string => {
  const { name, status, message, stack } = err;
  const text = `${name} ${status ?? ''} ${message ?? ''}`;

  return `${stack || text}\n`;
};

const writeFile = (file: string, text: string) => {
  appendFile(file, text, (error) => {
    if (error) {
      stderr.write(getErrorLogText(error), 'utf-8');
    }
  });
};

export const log = (err: ClientError | null, req?: Request, res?: Response) => {
  if (INFO_LOG.includes(loggingLevel) && req && res) {
    const logText = getLogText(req, res);

    stdout.write(logText, 'utf-8');
    writeFile('log.txt', logText);
  }

  if (ERR_LOG.includes(loggingLevel) && err) {
    const logText = getErrorLogText(err);

    stderr.write(logText, 'utf-8');
    writeFile('error-log.txt', logText);
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
