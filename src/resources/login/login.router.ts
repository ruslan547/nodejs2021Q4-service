import { Router, Request, Response } from 'express';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get((req: Request, res: Response) => {
    res.status(200).json('login');
  });

export default router;
