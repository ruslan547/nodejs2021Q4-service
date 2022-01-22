import { FindCondition } from 'typeorm';
import { UpdateData } from '../../common/entity/updatable';
import { UserOptions } from './user.model';
import * as usersRepo from './user.memory.repository';
import { hash } from '../../utils/dcryptUtils';

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
export const getUser = (id: FindCondition<string> | undefined) => usersRepo.getById(id);

/**
 * Returns User
 * @param data user's data
 * @returns User
 */
export const createUser = async (data: UserOptions) => {
  const password = await hash(data.password.toString());
  const users = await usersRepo.getAll();
  const isCreated = users?.find((item) => item.login === data.login);

  if (isCreated) {
    return null;
  }

  return usersRepo.create({ ...data, password });
};

/**
 * Returns User or null
 * @param id user's id
 * @param data user's update data
 * @returns User or null
 */
export const updateUser = (
  id: FindCondition<string> | undefined,
  data: UpdateData,
) => usersRepo.update(id, data);

/**
 * Returns User or null
 * @param id user's id
 * @returns User or null
 */
export const deleteUser = (id: FindCondition<string> | undefined) => usersRepo.deleteById(id);
