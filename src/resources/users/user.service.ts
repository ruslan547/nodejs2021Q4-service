import { UpdateData } from "../../common/entity/updatable";
import { UserOptions } from "./user.model";

const usersRepo = require('./user.memory.repository');

export const getAll = () => usersRepo.getAll();

export const getUser = (id: string) => usersRepo.getById(id);

export const createUser = (data: UserOptions) => usersRepo.create(data);

export const updateUser = (id: string, data: UpdateData) => usersRepo.update(id, data);

export const deleteUser = (id: string) => usersRepo.deleteById(id);
