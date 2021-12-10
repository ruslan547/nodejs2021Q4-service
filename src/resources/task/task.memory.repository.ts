import { UpdateData } from '../../common/entity/updatable';
import { Task, TaskOption } from './task.model';

/**
 * Returns all tasks
 * @returns array of tasks, Task[]
 */
export const getAll = async (boardId: string) => Task.getTaskByBoardId(boardId);

/**
 * Returns Task or undefined
 * @param id id of task
 * @returns Task or undefined
 */
export const getById = async (id: string) => Task.getTaskById(id);

/**
 * Returns Task
 * @param data task's data
 * @returns Task
 */
export const create = async (
  boardId: string,
  data: TaskOption,
) => Task.add(new Task({ ...data, boardId }));

/**
 * Returns Task or undefined
 * @param id task's id
 * @param data task's update data
 * @returns Task or undefined
 */
export const update = async (id: string, data: UpdateData) => Task.updateById(id, data);

/**
 * Returns Task or null
 * @param id task's id
 * @returns Task or null
 */
export const deleteById = async (id: string) => Task.deleteById(id);
