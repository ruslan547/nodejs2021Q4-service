import { Board, BoardOption } from './board.model';
import { Task } from '../task/task.model';
import { UpdateData } from '../../common/entity/updatable';

/**
 * Returns all boards
 * @returns array of boards, Board[]
 */
export const getAll = async () => Board.getBoards();

/**
 * Returns Board or null
 * @param id id of board
 * @returns Board or null
 */
export const getById = async (id: string) => Board.getById(id);

/**
 * Returns Board
 * @param data board's data
 * @returns Board
 */
export const create = async (data: BoardOption) => Board.add(new Board(data));

/**
 * Returns Board or null
 * @param id board's id
 * @param data board's update data
 * @returns Board or null
 */
export const update = async (id: string, data: UpdateData) => Board.updateById(id, data);

/**
 * Returns Board or null
 * @param id board's id
 * @returns Board or null
 */
export const deleteById = async (id: string) => {
  Task.getTasks().forEach((task) => {
    if (task.boardId === id) {
      Task.deleteById(task.id);
    }
  });

  return Board.deleteById(id);
};
