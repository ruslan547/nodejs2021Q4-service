import { BoardColumn } from '../column.model';

export class CreateBoardDto {
  title: string;

  columns: BoardColumn[];
}
