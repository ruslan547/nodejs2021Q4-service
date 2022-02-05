import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { appendFileSync } from 'fs';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  getQuery = (request: Request) => Object.entries(request.query)
    .map(([key, value]) => `&${key}=${value?.toString()}`)
    .join('');

  getBody = (request: Request) => Object.entries(request.body)
    .map(([key, value]) => (key !== 'password' ? `${key}=${value}` : ''))
    .join(',')
    .slice(0, -1);

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url } = request;
    const query = this.getQuery(request);
    const body = this.getBody(request);

    response.on('close', () => {
      const { statusCode, statusMessage } = response;
      const message = `${method} ${url} ${statusCode} ${query} ${body}`;

      this.logger.log(message);
      appendFileSync('logs/log.txt', message);

      if (statusCode >= 400 && statusCode < 500) {
        const errMessage = `${statusCode} ${statusMessage}`;

        this.logger.log(errMessage);
        appendFileSync('logs/error-log.txt', errMessage);
      }
    });

    next();
  }
}
