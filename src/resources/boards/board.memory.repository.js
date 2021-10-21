const { Board } = require('./board.model');

const getAll = async () => Board.getBoards();

const getById = async (id) => Board.getById(id);

const create = async (data) => Board.add(new Board(data));

const update = async (id, data) => Board.updateById(id, data);

const deleteById = async (id) => Board.deleteById(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
