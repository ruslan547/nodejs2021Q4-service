import { UpdateData, Updatable } from "../../common/entity/updatable";
import { v4 as uuid } from "uuid";
import { Column } from "./column.model";

const boards: Board[] = [];

export interface BoardOption {
  id: string;
  title: string;
  columns: Column[];
}

export class Board extends Updatable {
  id: string;
  title: string;
  columns: Column[];

  constructor({ id = uuid(), title = 'title', columns = [] }: BoardOption) {
    super();

    this.id = id;
    this.title = title;
    this.columns = columns;

    if (!this.columns.length) {
      this.columns.push(new Column({}));
    }
  }

  static getBoards() {
    return [...boards];
  }

  static getById(id: string) {
    const board = boards.find(item => item.id === id);
    return board ?? null;
  }

  static add(board: Board) {
    boards.push(board);
    return board;
  }

  static updateById(id: string, data: UpdateData) {
    const board = Board.getById(id);
    return board ? board.update(data) : null;
  }

  static deleteById(id: string) {
    const index = boards.findIndex(item => item.id === id);
    return (index !== -1) ? boards.splice(index, 1)[0] : null;
  }
}
