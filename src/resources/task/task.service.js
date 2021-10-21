const tasksRepo = require('./task.memory.repository')

const getAll = (boardId) => tasksRepo.getAll(boardId);

const getById = (boardId, id) => tasksRepo.getById(boardId, id);

const create = (boardId, body) => tasksRepo.create(boardId, body);

const update = (boardId, id, data) => tasksRepo.update(boardId, id, data);

const deleteById = (boardId, id) => tasksRepo.deleteById(boardId, id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
