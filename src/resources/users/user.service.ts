import { FindCondition } from 'typeorm';
import { UpdateData } from '../../common/entity/updatable';
import { UserOptions } from './user.model';
import * as usersRepo from './user.memory.repository';

/**
 * Returns all users
 * @returns array of users, User[]
 */
export const getAll = () => usersRepo.getAll();

/**
 * Returns User or null
 * @param id id of user
 * @returns User or null
 */
export const getUser = (id: FindCondition<number> | undefined) => usersRepo.getById(id);

/**
 * Returns User
 * @param data user's data
 * @returns User
 */
export const createUser = (data: UserOptions) => usersRepo.create(data);

/**
 * Returns User or null
 * @param id user's id
 * @param data user's update data
 * @returns User or null
 */
export const updateUser = (
  id: FindCondition<number> | undefined,
  data: UpdateData,
) => usersRepo.update(id, data);

/**
 * Returns User or null
 * @param id user's id
 * @returns User or null
 */
export const deleteUser = (id: FindCondition<number> | undefined) => usersRepo.deleteById(id);
