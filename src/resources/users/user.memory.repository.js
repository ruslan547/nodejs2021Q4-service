const User = require('./user.model');
const { Board } = require('../boards/board.model');

const { board } = Board;

let users = [];

const getAll = async () => users;

const getUser = async (id) => users.find(item => item.id === id);

const createUser = async (data) => {
  const user = new User(data);

  users.push(user);

  return user;
};

const updateUser = async (id, data) => {
  const prevUser = users.find(item => item.id === id);

  if (!prevUser) {
    return null;
  }

  const updatedUser = new User({ id, ...data });

  users = users.filter(item => item.id !== id);
  users.push(updatedUser);

  return updatedUser;
};

const deleteUser = async (id) => {
  const deletedUser = users.find(item => item.id === id);

  if (!deletedUser) {
    return null;
  }

  users = users.filter(item => item.id !== id);

  board.columns.forEach(col => {
    col.tasks.forEach(task => {
      if (task.id === id) {
        task.setUserId(null);
      }
    });
  })

  return deletedUser;
}

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
