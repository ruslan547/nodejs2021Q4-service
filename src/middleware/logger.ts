import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  getQuery = (request: Request) => Object.entries(request.query)
    .map(([key, value]) => `&${key}=${value?.toString()}`)
    .join('');

  getBody = (request: Request) => Object.entries(request.body)
    .map(([key, value]) => `${key}=${value}`)
    .join(',')
    .slice(0, -1);

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url } = request;
    const query = this.getQuery(request);
    const body = this.getBody(request);

    response.on('close', () => {
      const { statusCode } = response;

      this.logger.log(
        `${method} ${url} ${statusCode} ${query} ${body}`,
      );
    });

    next();
  }
}
