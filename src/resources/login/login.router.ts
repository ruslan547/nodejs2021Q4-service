import { Router, Request, Response, NextFunction } from 'express';
import { ClientError } from '../../common/errors/clientError';
import * as loginService from './login.service';

const router = Router({ mergeParams: true });

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    const { login, password } = req.body;

    if (!login || !password) {
      next(new ClientError('Bad request', 400));
      return;
    }

    try {
      const user = await loginService.login(req.body);

      res.status(200)
        .json(user);
    } catch (err) {
      next(err);
    }
  });

export default router;
