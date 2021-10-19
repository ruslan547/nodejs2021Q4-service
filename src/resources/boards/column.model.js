const { v4: uuid } = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'title', tasks = [] }) {
    this.id = id;
    this.title = title;
    this.tasks = tasks;
  }
}

module.exports = {
  Column
};
