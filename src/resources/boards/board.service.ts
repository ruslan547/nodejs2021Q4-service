import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
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
      throw new HttpException('Not found', 404);
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

    board.title = data.title ?? 'title';
    board.columns = columns.reverse();

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
      throw new HttpException('Not found', 404);
    }

    foundBoard.update(data);

    return this.boardRepository.save(foundBoard);
  };

  /**
   * Returns Board or null
   * @param id board's id
   * @returns Board or null
   */
  deleteById = (id: FindCondition<string> | undefined) => {
    // const tasks = await driverManager.getRepository(Task)?.find({ boardId: id });

    // if (tasks) {
    //   await driverManager.getRepository(Task)?.remove(tasks);
    // }

    // const foundBoard = await driverManager
    //   .getRepository(Board)?.findOne({ id });

    // if (foundBoard) {
    //   const columns = await driverManager
    //     .getRepository(BoardColumn)?.find({ boardId: foundBoard.id });

    //   if (columns) {
    //     await driverManager.getRepository(BoardColumn)?.remove(columns);
    //   }

    //   return driverManager
    //     .getRepository(Board)?.remove(foundBoard);
    // }

    // return foundBoard;
  };
}
