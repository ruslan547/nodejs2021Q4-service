import { Board, BoardOption } from './board.model';
import { Task } from '../task/task.model';
import { UpdateData } from '../../common/entity/updatable';

export const getAll = async () => Board.getBoards();

export const getById = async (id: string) => Board.getById(id);

export const create = async (data: BoardOption) => Board.add(new Board(data));

export const update = async (id: string, data: UpdateData) => Board.updateById(id, data);

export const deleteById = async (id: string) => {
  Task.getTasks().forEach((task) => {
    if (task.boardId === id) {
      Task.deleteById(task.id);
    }
  });

  return Board.deleteById(id);
};
