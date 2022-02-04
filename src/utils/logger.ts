import { LoggerService } from '@nestjs/common';
import { appendFileSync } from 'fs';

export class CustomLogger implements LoggerService {
  // eslint-disable-next-line class-methods-use-this
  log(message: string) {
    console.log(message);
    appendFileSync('logs/log.txt', message);
  }

  // eslint-disable-next-line class-methods-use-this
  error(message: string, stack: string) {
    console.log(message, stack);
    appendFileSync('logs/error-log.txt', `${message} ${stack}`);
  }

  // eslint-disable-next-line class-methods-use-this
  warn(message: string) {
    console.log(message);
    appendFileSync('logs/log.txt', message);
  }
}
