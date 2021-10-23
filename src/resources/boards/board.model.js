const { v4: uuid } = require('uuid');

const { Updatable } = require('../../common/entity/updatable');
const { Column } = require('./column.model');
const { Task } = require('../task/task.model');

const boards = [];

class Board extends Updatable {
  constructor({ id = uuid(), title = 'title', columns = [] }) {
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

  getAllTasks() {
    return this.columns.reduce((ac, col) => {
      ac.push(...col.tasks);
      return ac;
    }, []);
  }

  getTaskById(id) {
    return this.getAllTasks()
      .find(item => item.id === id);
  }

  updateTaskById(id, data) {
    return  this.getTaskById(id)?.update(data);
  }

  deleteTaskById(id) {
    let colIndex = -1;
    let taskIndex = -1;

    this.columns.forEach((col, cI) => {
      col.tasks.forEach((task, tI) => {
        if (task.id === id) {
          colIndex = cI;
          taskIndex = tI;
        }
      })
    });

    if (taskIndex === -1) {
      return null;
    }

    return this.columns[colIndex]
      .tasks
      .splice(taskIndex, 1)[0];
  }

  createTask(data) {
    const lastColumn = this.columns[this.columns.length - 1];
    const columnId = lastColumn.id;
    const boardId = this.id;
    const task = new Task({ ...data, boardId, columnId});

    lastColumn.tasks.push(task);

    return task;
  }
}

module.exports = {
  Board
};
