import { FindCondition } from 'typeorm';
import { UpdateData } from '../../common/entity/updatable';
import { driverManager } from '../../utils/dbUtils';
import { BoardColumn } from '../boards/column.model';
import { Task, TaskOption } from './task.model';

// TODO update users

/**
 * Returns all tasks
 * @returns array of tasks, Task[]
 */
export const getAll = async (boardId: FindCondition<string> | undefined) => driverManager
  .getRepository(Task)?.find({ boardId });

/**
 * Returns Task or undefined
 * @param id id of task
 * @returns Task or undefined
 */
export const getById = async (id: FindCondition<string> | undefined) => driverManager
  .getRepository(Task)?.findOne({ id });

/**
 * Returns Task
 * @param data task's data
 * @returns Task
 */
export const create = async (
  boardId: FindCondition<string> | undefined,
  data: TaskOption,
) => {
  const task = new Task();
  const column = await driverManager.getRepository(BoardColumn)?.findOne({ boardId });

  task.boardId = boardId as string;
  task.title = data.title;
  task.order = data.order;
  task.description = data.description;
  task.columnId = column?.id as string;
  task.userId = data.userId;

  return driverManager.getRepository(Task)?.save(task);
};

/**
 * Returns Task or undefined
 * @param id task's id
 * @param data task's update data
 * @returns Task or undefined
 */
export const update = async (
  id: FindCondition<string> | undefined,
  data: UpdateData,
) => {
  const foundTask = await driverManager.getRepository(Task)?.findOne({ id });

  if (foundTask) {
    foundTask.update(data);

    return driverManager.getRepository(Task)?.save(foundTask);
  }

  return foundTask;
};

/**
 * Returns Task or null
 * @param id task's id
 * @returns Task or null
 */
export const deleteById = async (id: FindCondition<string> | undefined) => {
  const foundTask = await driverManager
    .getRepository(Task)?.findOne({ id });

  if (foundTask) {
    return driverManager
      .getRepository(Task)?.remove(foundTask);
  }

  return foundTask;
};
