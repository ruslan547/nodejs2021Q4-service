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
    if (!req.body) {
      res.status(400);
      return;
    }

    const tasks = await tasksService.create(req.body);

    res.status(201).json(tasks);
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
      res.status(400);
      return;
    }

    const task = await tasksService.getById(taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .put(async (req, res) => {
    const { params: { taskId }, body } = req;

    if (!taskId || !body) {
      res.status(400);
      return;
    }

    const task = await tasksService.update(taskId, body);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })
  .delete(async (req, res) => {
    const { taskId } = req.params;

    if (!taskId) {
      res.status(400);
      return;
    }

    const task = await tasksService.deleteById(taskId);

    if (!task) {
      res.status(404).json('Not found');
      return;
    }

    res.json(task);
  })

module.exports = router;
