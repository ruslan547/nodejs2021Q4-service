import { FindCondition } from 'typeorm';
import { UpdateData } from '../../common/entity/updatable';
import { User, UserOptions } from './user.model';
import { driverManager } from '../../utils/dbUtils';

/**
 * Returns all users
 * @returns array of users, User[]
 */
export const getAll = async () => driverManager.getRepository(User)?.find();

/**
 * Returns User or null
 * @param id id of user
 * @returns User or null
 */

export const getById = async (
  id: FindCondition<number> | undefined,
) => driverManager.getRepository(User)?.findOne({ id });

/**
 * Returns User
 * @param data user's data
 * @returns User
 */
export const create = async (data: UserOptions) => driverManager
  .getRepository(User)?.save(new User(data));

/**
 * Returns User or null
 * @param id user's id
 * @param data user's update data
 * @returns User or null
 */
export const update = async (id: FindCondition<number> | undefined, data: UpdateData) => {
  const foundUser = await driverManager
    .getRepository(User)?.findOne({ id });

  if (foundUser) {
    foundUser.update(data);

    return driverManager
      .getRepository(User)?.save(foundUser);
  }

  return foundUser;
};

/**
 * Returns User or null
 * @param id user's id
 * @returns User or null
 */
export const deleteById = async (id: FindCondition<number> | undefined) => {
  const foundUser = await driverManager
    .getRepository(User)?.findOne({ id });

  if (foundUser) {
    // TODO remove tasks of this user

    return driverManager
      .getRepository(User)?.remove(foundUser);
  }

  return foundUser;
};
