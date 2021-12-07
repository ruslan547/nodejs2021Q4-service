const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getById(id);

const createUser = (data) => usersRepo.create(data);

const updateUser = (id, data) => usersRepo.update(id, data);

const deleteUser = (id) => usersRepo.deleteById(id);

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
