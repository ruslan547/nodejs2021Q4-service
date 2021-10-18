const { Board } = require('./board.model');

let boards = [];

const getAll = async () => boards;

const getById = async (id) => boards.find(item => item.id === id);

const create = async (data) => {
  boards.push(new Board(data));
  return boards[boards.length - 1];
};

const update = async (id, data) => {
  const prevBoard = boards.find(item => item.id === id);

  if (!prevBoard) {
    return null;
  }

  boards = boards.filter(item => item.id !== id);
  boards.push(new Board({ id, ...data }));

  return boards[boards.length - 1];
};

const deleteById = async (id) => {
  const deletedBoard = boards.find(item => item.id === id);

  if (!deletedBoard) {
    return null;
  }

  boards = boards.filter(item => item.id !== id);

  return deletedBoard;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
