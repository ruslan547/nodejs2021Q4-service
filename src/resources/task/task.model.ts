const { v4: uuid } = require('uuid');

const { Updatable } = require('../../common/entity/updatable');

const tasks = [];

export class Task extends Updatable {
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

  static getTasks() {
    return [...tasks];
  }

  static getTaskByBoardId(boardId) {
    return Task.getTasks()
      .filter(task => task.boardId === boardId);
  }

  static getTaskById(id) {
    return Task.getTasks().find(task => task.id === id);
  }

  static add(task) {
    tasks.push(task);
    return task;
  }

  static updateById(id, data) {
    return Task.getTaskById(id)?.update(data);
  }

  static deleteById(id) {
    const index = tasks.findIndex(item => item.id === id);

    if (index === -1) {
      return null;
    }

    return  tasks.splice(index, 1)[0];
  }

  setUserId(id) {
    this.userId = id;
  }
}
