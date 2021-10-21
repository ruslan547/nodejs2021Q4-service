const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.getById(id);

const create = (body) => boardsRepo.create(body);

const update = (id, data) => boardsRepo.update(id, data);

const deleteById = (id) => boardsRepo.deleteById(id);

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById
};
