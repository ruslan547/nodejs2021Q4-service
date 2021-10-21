const { v4: uuid } = require('uuid');
const { Updatable } = require('../../common/entity/updatable');

const boards = [];

class Board extends Updatable {
  constructor({ id = uuid(), title = 'title', columns = [] }) {
    super();

    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static getBoards() {
    return [...boards];
  }

  static getById(id) {
    const board = boards.find(item => item.id === id);
    return board ?? null;
  }

  static add(board) {
    boards.push(board);
    return board;
  }

  static updateById(id, data) {
    const board = Board.getById(id);
    return board ? board.update(data) : null;
  }

  static deleteById(id) {
    const index = boards.findIndex(item => item.id === id);
    return (index !== -1) ? boards.splice(index, 1)[0] : null;
  }
}

module.exports = {
  Board
};
