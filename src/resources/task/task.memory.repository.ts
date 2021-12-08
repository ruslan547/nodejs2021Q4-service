import { UpdateData } from '../../common/entity/updatable';
import { Task, TaskOption } from './task.model';

export const getAll = async (boardId: string) => Task.getTaskByBoardId(boardId);

export const getById = async (id: string) => Task.getTaskById(id);

export const create =
  async (boardId: string, data: TaskOption) => Task.add(new Task({ ...data, boardId }));

export const update = async (id: string, data: UpdateData) => Task.updateById(id, data);

export const deleteById = async (id: string) => Task.deleteById(id);
