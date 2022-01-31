import { BoardColumn } from '../column.model';

export class GetBoardDto {
  id: string;

  title: string;

  columns: BoardColumn[]
}
