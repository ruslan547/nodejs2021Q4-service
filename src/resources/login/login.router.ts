import { Router, Request, Response } from 'express';
import * as loginService from './login.service';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    res.status(200).json('login');
  })
  .post(async (req: Request, res: Response) => {
    const { login, password } = req.body;

    if (!login || !password) {
      res.status(400).json({
        message: 'Bad request',
        description: 'login, password are required field',
      });
      return;
    }

    const loginData = await loginService.login(req.body);

    if (!loginData) {
      res.status(400).json({
        message: 'Bad request',
        description: 'invalid login or password',
      });
      return;
    }

    res.status(200).json(loginData);
  });

export default router;
