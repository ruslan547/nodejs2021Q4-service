import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../common/config';

interface Headers {
  authorization: string;
}

interface Request {
  headers: Headers;
}

const validateRequest = (req: Request): Promise<boolean> => new Promise((resolve) => {
  if (req.headers.authorization) {
    if (!PRIVATE_KEY) {
      throw new HttpException('PRIVATE_KEY is miss', 500);
    }

    jwt.verify(req.headers.authorization.split(' ')[1], PRIVATE_KEY, (err) => {
      if (err) {
        throw new HttpException('Unauthorized', 401);
      }

      resolve(true);
    });
  } else {
    throw new HttpException('Unauthorized', 401);
  }
});

@Injectable()
export class AuthGuard implements CanActivate {
  // eslint-disable-next-line class-methods-use-this
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    return validateRequest(req);
  }
}
