const { v4: uuid } = require('uuid');

const tasksRepo = require('./task.memory.repository')

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getById = (id) => tasksRepo.getById(id);

const create = (body) => tasksRepo.create({ ...body, id: uuid() });

const update = (id, data) => tasksRepo.update(id, data);

const deleteById = (id) => tasksRepo.deleteById(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
