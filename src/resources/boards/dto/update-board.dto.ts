import { BoardColumn } from '../column.model';

export class UpdateBoardDto {
  title: string;

  columns: BoardColumn[];
}
