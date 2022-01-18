import { FindCondition } from 'typeorm';
import bcrypt from 'bcrypt';
import util from 'util';
import { User, UserOptions } from './user.model';
import { UpdateData } from '../../common/entity/updatable';
import { driverManager } from '../../utils/dbUtils';
import { Task } from '../task/task.model';

const hash = util.promisify(bcrypt.hash);

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
  id: FindCondition<string> | undefined,
) => driverManager.getRepository(User)?.findOne({ id });

/**
 * Returns User
 * @param data user's data
 * @returns User
 */
export const create = async (data: UserOptions) => {
  const user = new User();
  const password = await hash(data.password, 10);

  user.name = data.name;
  user.login = data.login;
  user.password = password;

  return driverManager
    .getRepository(User)?.save(user);
};

/**
 * Returns User or null
 * @param id user's id
 * @param data user's update data
 * @returns User or null
 */
export const update = async (id: FindCondition<string> | undefined, data: UpdateData) => {
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
export const deleteById = async (id: FindCondition<string> | undefined) => {
  const foundUser = await driverManager
    .getRepository(User)?.findOne({ id });

  if (foundUser) {
    const tasks = await driverManager.getRepository(Task)?.find({ userId: id });

    if (tasks?.length) {
      tasks.forEach(async (item) => {
        // eslint-disable-next-line no-param-reassign
        item.userId = null;
        await driverManager.getRepository(Task)?.save(item);
      });
    }

    return driverManager
      .getRepository(User)?.remove(foundUser);
  }

  return foundUser;
};
