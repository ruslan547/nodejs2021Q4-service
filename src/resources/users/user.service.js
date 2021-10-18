const { v4: uuid } = require('uuid');

const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUser(id);

const createUser = (body) => {
  const id = uuid();

  return usersRepo.createUser({ ...body, id });
}

const updateUser = (id, data) => usersRepo.updateUser(id, data);

const deleteUser = (id) => usersRepo.deleteUser(id);

module.exports = {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
