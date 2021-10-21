const { v4: uuid } = require('uuid');
const { Updatable } = require('../../common/entity/updatable');

class Task extends Updatable {
  constructor({
    id = uuid(),
    title = 'title',
    order = 'order',
    description = 'description',
    userId,
    boardId,
    columnId
  }) {
    super();

    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  setUserId(id) {
    this.userId = id;
  }
}

module.exports = {
  Task
};
