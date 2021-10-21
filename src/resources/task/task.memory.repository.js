const { Task } = require('./task.model');
const boardsRepo = require('../boards/board.memory.repository');
const { Column } = require('../boards/column.model');

const getAll = async (boardId) => {
  const board = await boardsRepo.getById(boardId);
  return board?.columns.reduce((ac, col) => {
    ac.push(...col.tasks);
    return ac;
  }, []);
};

const getById = async (boardId, id) => {
  const board = await boardsRepo.getById(boardId);

  return board?.columns
    .reduce((ac, col) => {
      ac.push(...col.tasks);
      return ac;
    }, [])
    .find(item => item.id === id);
};

const create = async (boardId, data) => {
  const board = await boardsRepo.getById(boardId);

  if (!board) {
    return null;
  }

  const { columns } = board;
  let { length } = columns;

  if (!length) {
    columns.push(new Column({}));
    length += 1;
  }

  const lastColumn = columns[length - 1];
  const { tasks } = lastColumn;
  const columnId = lastColumn.id;

  tasks.push(
    new Task({ ...data, boardId, columnId})
  );

  return tasks[tasks.length - 1];
};

const update = async (boardId, id, data) => {
  const board = await boardsRepo.getById(boardId);

  if (!board) {
    return null;
  }

  const task = board?.columns
    .reduce((ac, col) => {
      ac.push(...col.tasks);
      return ac;
    }, [])
    .find(item => item.id === id);

  if (!task) {
    return  null;
  }

  return  task.update(data);
};

const deleteById = async (boardId, id) => {
  const board = await boardsRepo.getById(boardId);

  let colIndex = -1;
  let taskIndex = -1;

  if (!board) {
    return null;
  }

  board.columns.forEach((col, cI) => {
    col.tasks.forEach((task, tI) => {
      if (task.id === id) {
        colIndex = cI;
        taskIndex = tI;
      }
    })
  });

  if (taskIndex === -1) {
    return null;
  }

  const [deletedTask] = board?.columns[colIndex].tasks.splice(taskIndex, 1);

  return deletedTask;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
