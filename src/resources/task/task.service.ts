import { FindCondition } from 'typeorm';
import { UpdateData } from '../../common/entity/updatable';
import * as tasksRepo from './task.memory.repository';
import { TaskOption } from './task.model';

/**
 * Returns all tasks
 * @returns array of tasks, Task[]
 */
export const getAll = (boardId: FindCondition<string> | undefined) => tasksRepo.getAll(boardId);

/**
 * Returns Task or undefined
 * @param id id of task
 * @returns Task or undefined
 */
export const getById = (id: FindCondition<string> | undefined) => tasksRepo.getById(id);

/**
 * Returns Task
 * @param data task's data
 * @returns Task
 */
export const create = (
  boardId: FindCondition<string> | undefined,
  data: TaskOption,
) => tasksRepo.create(boardId, data);

/**
 * Returns Task or undefined
 * @param id task's id
 * @param data task's update data
 * @returns Task or undefined
 */
export const update = (
  id: FindCondition<string> | undefined,
  data: UpdateData,
) => tasksRepo.update(id, data);

/**
 * Returns Task or null
 * @param id task's id
 * @returns Task or null
 */
export const deleteById = (id: FindCondition<string> | undefined) => tasksRepo.deleteById(id);
