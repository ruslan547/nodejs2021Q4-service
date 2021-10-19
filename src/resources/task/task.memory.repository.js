const { Task } = require('./task.model');
const boardsRepo = require('../boards/board.memory.repository');

let tasks = [];

const getAll = async (boardId) => {
  const board = await boardsRepo.getById(boardId);
  return board?.columns.reduce((ac, col) => ac.push(...col.tasks), []);
};

const getById = async (boardId, id) => {
  const board = await boardsRepo.getById(boardId);

  return board?.columns
    .reduce((ac, col) => ac.push(...col.tasks), [])
    .find(item => item.id === id);
};

const create = async (boardId, data) => {
  tasks.push(new Task(data));
  return tasks[tasks.length - 1];
};

const update = async (id, data) => {
  const prevTask = tasks.find(item => item.id === id);

  if (!prevTask) {
    return null;
  }

  tasks = tasks.filter(item => item.id !== id);
  tasks.push(new Task({ id, ...data }));

  return tasks[tasks.length - 1];
};

const deleteById = async (id) => {
  const deletedTask = tasks.find(item => item.id === id);

  if (!deletedTask) {
    return null;
  }

  tasks = tasks.filter(item => item.id !== id);

  return deletedTask;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
