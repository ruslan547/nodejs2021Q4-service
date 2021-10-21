const { User } = require('./user.model');
const { Board } = require('../boards/board.model');

const getAll = async () => User.getUsers();

const getById = async (id) => User.getById(id);

const create = async (data) => User.add(new User(data));

const update = async (id, data) => User.updateById(id, data);

const deleteById = async (id) => {
  Board.getBoards().forEach(board => {
    board.columns.forEach(col => {
      col.tasks.forEach(task => {
        if (task.userId === id) {
          task.setUserId(null);
        }
      });
    });
  });

  return User.deleteById(id);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
