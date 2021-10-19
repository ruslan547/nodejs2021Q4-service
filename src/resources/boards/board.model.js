const { v4: uuid } = require('uuid');

class Board {
  constructor({ id = uuid(), title = 'title', columns = [] }) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = {
  Board
};
