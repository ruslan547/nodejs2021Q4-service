import { FindCondition } from 'typeorm';
import { UpdateData } from '../../common/entity/updatable';
import * as boardsRepo from './board.memory.repository';
import { BoardOption } from './board.model';

/**
 * Returns all boards
 * @returns array of boards, Board[]
 */
export const getAll = () => boardsRepo.getAll();

/**
 * Returns Board or null
 * @param id id of board
 * @returns Board or null
 */
export const getById = (id: FindCondition<number> | undefined) => boardsRepo.getById(id);

/**
 * Returns Board
 * @param data board's data
 * @returns Board
 */
export const create = (data: BoardOption) => boardsRepo.create(data);

/**
 * Returns Board or null
 * @param id board's id
 * @param data board's update data
 * @returns Board or null
 */
export const update = (id: FindCondition<number> | undefined, data: UpdateData) => boardsRepo
  .update(id, data);

/**
 * Returns Board or null
 * @param id board's id
 * @returns Board or null
 */
export const deleteById = (id: FindCondition<number> | undefined) => boardsRepo.deleteById(id);
