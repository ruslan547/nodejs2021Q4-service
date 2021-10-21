const router = require('express').Router({ mergeParams: true });

const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    if (!tasks) {
      res.status(404).json('Not found');
      return;
    }

    res.json(tasks);
  })
  .post(async (req, res) => {
    const { body, params: { boardId } } = req;

    if (!body.userId) {
      res.status(400).json('Bad request');
      return;
    }

    const task = await tasksService.create(boardId, body);

    res.status(201).json(task);
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.getById(boardId, taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .put(async (req, res) => {
    const { params: { taskId, boardId }, body } = req;
    const task = await tasksService.update(boardId, taskId, body);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .delete(async (req, res) => {
    const { taskId, boardId } = req.params;
    const task = await tasksService.deleteById(boardId, taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })

module.exports = router;
