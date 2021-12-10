import { UpdateData } from '../../common/entity/updatable';
import { User, UserOptions } from './user.model';
import { Task } from '../task/task.model';

/**
 * Returns all users
 * @returns array of users, User[]
 */
export const getAll = async () => User.getUsers();

/**
 * Returns User or null
 * @param id id of user
 * @returns User or null
 */
export const getById = async (id: string) => User.getById(id);

/**
 * Returns User
 * @param data user's data
 * @returns User
 */
export const create = async (data: UserOptions) => User.add(new User(data));

/**
 * Returns User or null
 * @param id user's id
 * @param data user's update data
 * @returns User or null
 */
export const update = async (id: string, data: UpdateData) => User.updateById(id, data);

/**
 * Returns User or null
 * @param id user's id
 * @returns User or null
 */
export const deleteById = async (id: string) => {
  Task.getTasks().forEach((task: Task) => {
    if (task.userId === id) {
      task.setUserId(null);
    }
  });

  return User.deleteById(id);
};
