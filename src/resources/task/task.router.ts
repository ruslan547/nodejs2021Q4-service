import { Router, Request, Response } from "express";
import * as tasksService from "./task.service";

const router = Router({ mergeParams: true });

router
  .route('/')
  .get(async (req: Request, res: Response) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    if (!tasks.length) {
      res.status(404).json('Not found');
      return;
    }

    res.json(tasks);
  })
  .post(async (req: Request, res: Response) => {
    const { body, params: { boardId } } = req;
    const task = await tasksService.create(boardId, body);

    if (!task) {
      res.status(400).json('Bad request');
      return;
    }

    res.status(201).json(task);
  });

router
  .route('/:taskId')
  .get(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await tasksService.getById(taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .put(async (req: Request, res: Response) => {
    const { params: { taskId }, body } = req;
    const task = await tasksService.update(taskId, body);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .delete(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const task = await tasksService.deleteById(taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })

export default router;
