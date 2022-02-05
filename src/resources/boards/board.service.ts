import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
import { Task } from '../task/task.model';
import { Board } from './board.model';
import { BoardColumn } from './column.model';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(BoardColumn) private columnRepository: Repository<BoardColumn>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  /**
   * Returns all boards
   * @returns array of boards, Board[]
   */
  getAll = async () => await this.boardRepository.find({ relations: ['columns'] }) ?? [];

  /**
   * Returns Board or null
   * @param id id of board
   * @returns Board or null
   */
  getById = async (id: FindCondition<string> | undefined) => {
    const board = await this.boardRepository
      .findOne({ id }, { relations: ['columns'] });

    if (!board) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return board;
  };

  /**
   * Returns Board
   * @param data board's data
   * @returns Board
   */
  create = async (data: CreateBoardDto) => {
    const board = new Board();
    const columns: BoardColumn[] = [];

    if (data.columns?.length) {
      data.columns.forEach(async (item) => {
        const column = new BoardColumn();

        column.title = item.title ?? 'column1';
        column.order = item.order ?? 1;
        await this.columnRepository.save(column);
        columns.push(column);
      });
    } else {
      const column = new BoardColumn();

      column.title = 'column1';
      column.order = 1;
      await this.columnRepository.save(column);
      columns.push(column);
    }

    columns.sort((a, b) => a.order - b.order);
    board.title = data.title ?? 'title';
    board.columns = columns;

    return this.boardRepository.save(board);
  };

  /**
   * Returns Board or null
   * @param id board's id
   * @param data board's update data
   * @returns Board or null
   */
  update = async (id: FindCondition<string> | undefined, data: UpdateBoardDto) => {
    const foundBoard = await this.boardRepository.findOne({ id });

    if (!foundBoard) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    foundBoard.update(data);

    return this.boardRepository.save(foundBoard);
  };

  /**
   * Returns Board or null
   * @param id board's id
   * @returns Board or null
   */
  deleteById = async (boardId: FindCondition<string> | undefined) => {
    const tasks = await this.taskRepository.find({ boardId });
    const columns = await this.columnRepository.find({ boardId });
    const board = await this.boardRepository.findOne({ id: boardId });

    if (!board) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.taskRepository.remove(tasks);
    await this.columnRepository.remove(columns);

    return this.boardRepository.remove(board);
  };
}
