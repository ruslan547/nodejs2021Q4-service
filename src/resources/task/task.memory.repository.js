const boardsRepo = require('../boards/board.memory.repository');

const getAll = async (boardId) => {
  const board = await boardsRepo.getById(boardId);
  return board?.getAllTasks();
};

const getById = async (boardId, id) => {
  const board = await boardsRepo.getById(boardId);
  return board?.getTaskById(id);
};

const create = async (boardId, data) => {
  const board = await boardsRepo.getById(boardId);
  return board?.createTask(data);
};

const update = async (boardId, id, data) => {
  const board = await boardsRepo.getById(boardId);
  return board?.updateTaskById(id, data);
};

const deleteById = async (boardId, id) => {
  const board = await boardsRepo.getById(boardId);
  return board?.deleteTaskById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
