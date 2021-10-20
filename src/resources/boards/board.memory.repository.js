const { Board } = require('./board.model');

const { boards } = Board;

const getAll = async () => boards;

const getById = async (id) => boards.find(item => item.id === id);

const create = async (data) => {
  boards.push(new Board(data));
  return boards[boards.length - 1];
};

const update = async (id, data) => {
  const board = boards.find(item => item.id === id);

  if (!board) {
    return null;
  }

  return board.update(data);
};

const deleteById = async (id) => {
  const index = boards.findIndex(item => item.id === id);

  if (index === -1) {
    return null;
  }

  const [deletedBoard] = boards.splice(index, 1);

  return deletedBoard;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
