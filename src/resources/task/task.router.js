const router = require('express').Router({ mergeParams: true });

const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const tasks = await tasksService.getAll(boardId);

    if (!tasks.length) {
      res.status(404).json('Not found');
      return;
    }

    res.json(tasks);
  })
  .post(async (req, res) => {
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
  .get(async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.getById(taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .put(async (req, res) => {
    const { params: { taskId }, body } = req;
    const task = await tasksService.update(taskId, body);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .delete(async (req, res) => {
    const { taskId } = req.params;
    const task = await tasksService.deleteById(taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })

module.exports = router;
