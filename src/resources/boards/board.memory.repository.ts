import { FindCondition } from 'typeorm';
import { Board, BoardOption } from './board.model';
import { UpdateData } from '../../common/entity/updatable';
import { driverManager } from '../../utils/dbUtils';
import { BoardColumn } from './column.model';

/**
 * Returns all boards
 * @returns array of boards, Board[]
 */
export const getAll = async () => driverManager.getRepository(Board)?.find();

/**
 * Returns Board or null
 * @param id id of board
 * @returns Board or null
 */
export const getById = async (
  id: FindCondition<number> | undefined,
) => driverManager.getRepository(Board)?.findOne({ id });

/**
 * Returns Board
 * @param data board's data
 * @returns Board
 */
export const create = async (data: BoardOption) => {
  const manager = driverManager.getManager();
  const board = new Board();
  const column = new BoardColumn();

  board.title = data.title ?? 'title';
  column.title = column.title ?? 'column1';
  column.order = 1;

  const savedBoard = await manager?.save(board);

  if (savedBoard) {
    column.boardId = savedBoard.id;
    await manager?.save(column);
  }

  return savedBoard;
};

/**
 * Returns Board or null
 * @param id board's id
 * @param data board's update data
 * @returns Board or null
 */
export const update = async (id: FindCondition<number> | undefined, data: UpdateData) => {
  const foundBoard = await driverManager.getRepository(Board)?.findOne({ id });

  if (foundBoard) {
    foundBoard.update(data);

    return driverManager.getRepository(Board)?.save(foundBoard);
  }

  return foundBoard;
};

/**
 * Returns Board or null
 * @param id board's id
 * @returns Board or null
 */
export const deleteById = async (id: FindCondition<number> | undefined) => {
  // TODO delete all tasks

  // Task.getTasks().forEach((task) => {
  //   if (task.boardId === id) {
  //     Task.deleteById(task.id);
  //   }
  // });

  const foundBoard = await driverManager
    .getRepository(Board)?.findOne({ id });

  if (foundBoard) {
    return driverManager
      .getRepository(Board)?.remove(foundBoard);
  }

  return foundBoard;
};
