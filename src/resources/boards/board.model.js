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

  static get boards() {
    return boards;
  }
}

module.exports = {
  Board
};
