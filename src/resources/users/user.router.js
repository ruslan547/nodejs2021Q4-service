const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();

    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.createUser(req.body);

    res.status(201).json(User.toResponse(user));
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.userId);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .put(async (req, res) => {
    const { params: { userId }, body } = req;

    const user = await usersService.updateUser(userId, body);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })
  .delete(async (req, res) => {
    const user = await usersService.deleteUser(req.params.userId);

    if (!user) {
      res.status(404).json('Not found');
      return;
    }

    res.json(User.toResponse(user));
  })

module.exports = router;
