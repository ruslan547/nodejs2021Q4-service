import { Router, Request, Response } from 'express';
import * as boardsService from './board.service';

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
  .post(async (req: Request, res: Response) => {
    const board = await boardsService.create(req.body);

    res.status(201).json(board);
  });

router
  .route('/:boardId')
  .get(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId);

    if (!board) {
      res.status(404).json('Not found');
      return;
    }

    res.json(board);
  })
  .put(async (req: Request, res: Response) => {
    const { params: { boardId }, body } = req;
    const board = await boardsService.update(boardId, body);

    if (!board) {
      res.status(404).json('Not found');
      return;
    }

    res.json(board);
  })
  .delete(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const board = await boardsService.deleteById(boardId);

    if (!board) {
      res.status(404).json('Not found');
      return;
    }

    res.json(board);
  });

export default router;
