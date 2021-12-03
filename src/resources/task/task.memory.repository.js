const { Task } = require('./task.model');

const getAll = async (boardId) => Task.getTaskByBoardId(boardId);

const getById = async (id) => Task.getTaskById(id);

const create = async (boardId, data) => Task.add(new Task({ ...data, boardId }));

const update = async (id, data) => Task.updateById(id, data);

const deleteById = async (id) => Task.deleteById(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
