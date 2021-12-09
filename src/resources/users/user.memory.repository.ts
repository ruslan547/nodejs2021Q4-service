import { UpdateData } from '../../common/entity/updatable';
import { User, UserOptions } from './user.model';
import { Task } from '../task/task.model';

export const getAll = async () => User.getUsers();

export const getById = async (id: string) => User.getById(id);

export const create = async (data: UserOptions) => User.add(new User(data));

export const update = async (id: string, data: UpdateData) => User.updateById(id, data);

export const deleteById = async (id: string) => {
  Task.getTasks().forEach((task: Task) => {
    if (task.userId === id) {
      task.setUserId(null);
    }
  });

  return User.deleteById(id);
};
