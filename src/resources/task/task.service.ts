import { UpdateData } from '../../common/entity/updatable';
import * as tasksRepo from './task.memory.repository';
import { TaskOption } from './task.model';

/**
 * Returns all tasks
 * @returns array of tasks, Task[]
 */
export const getAll = (boardId: string) => tasksRepo.getAll(boardId);

/**
 * Returns Task or undefined
 * @param id id of task
 * @returns Task or undefined
 */
export const getById = (id: string) => tasksRepo.getById(id);

/**
 * Returns Task
 * @param data task's data
 * @returns Task
 */
export const create = (boardId: string, data: TaskOption) => tasksRepo.create(boardId, data);

/**
 * Returns Task or undefined
 * @param id task's id
 * @param data task's update data
 * @returns Task or undefined
 */
export const update = (id: string, data: UpdateData) => tasksRepo.update(id, data);

/**
 * Returns Task or null
 * @param id task's id
 * @returns Task or null
 */
export const deleteById = (id: string) => tasksRepo.deleteById(id);
