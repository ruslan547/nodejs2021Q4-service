const router = require('express').Router();

const boardsService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();

    res.json(boards);
  })
  .post(async (req, res) => {
    const board = await boardsService.create(req.body);

    res.status(201).json(board);
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.getById(boardId);

    if (!board) {
      res.status(404).json('Not found');
      return;
    }

    res.json(board);
  })
  .put(async (req, res) => {
    const { params: { boardId }, body } = req;
    const board = await boardsService.update(boardId, body);

    if (!board) {
      res.status(404).json('Not found');
      return;
    }

    res.json(board);
  })
  .delete(async (req, res) => {
    const { boardId } = req.params;
    const board = await boardsService.deleteById(boardId);

    if (!board) {
      res.status(404).json('Not found');
      return;
    }

    res.json(board);
  })

module.exports = router;
