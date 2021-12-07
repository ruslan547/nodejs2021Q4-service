const tasksRepo = require('./task.memory.repository')

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getById = (id) => tasksRepo.getById(id);

const create = (boardId, body) => tasksRepo.create(boardId, body);

const update = (id, data) => tasksRepo.update(id, data);

const deleteById = (id) => tasksRepo.deleteById(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
