import { Router, Request, Response } from 'express';
import { FindCondition } from 'typeorm';
import { User } from './user.model';
import * as usersService from './user.service';

const router = Router();

router
  .route('/')
  .get(async (_: Request, res: Response) => {
    const users = await usersService.getAll() ?? [];

    res.json(users.map(User.toResponse));
  })
  .post(async (req: Request, res: Response) => {
    const { login, password, name } = req.body;
    if (!login || !password || !name) {
      res.status(400).json({
        message: 'Bad request',
        description: 'name, login, password are required field',
      });
      return;
    }

    const user = await usersService.createUser(req.body);

    if (!user) {
      res.status(400).json({
        message: 'Bad request',
        description: `user ${login} was created already`,
      });
      return;
    }

    res.status(201).json(User.toResponse(user));
  });

router
  .route('/:userId')
  .get(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await usersService
      .getUser(userId as unknown as FindCondition<string> | undefined);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .put(async (req: Request, res: Response) => {
    const { params: { userId }, body } = req;
    const user = await usersService
      .updateUser(userId as unknown as FindCondition<string> | undefined, body);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .delete(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await usersService
      .deleteUser(userId as unknown as FindCondition<string> | undefined);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  });

export default router;
