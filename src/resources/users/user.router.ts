import { Router, Request, Response } from 'express';
import { User } from './user.model';
import * as usersService from './user.service';

const router = Router();

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
  .post(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);

    res.status(201).json(User.toResponse(user));
  });

router
  .route('/:userId')
  .get(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await usersService.getUser(userId);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .put(async (req: Request, res: Response) => {
    const { params: { userId }, body } = req;
    const user = await usersService.updateUser(userId, body);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .delete(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const user = await usersService.deleteUser(userId);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  });

export default router;
