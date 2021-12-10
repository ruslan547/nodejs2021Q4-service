import { v4 as uuid } from 'uuid';
import { UpdateData, Updatable } from '../../common/entity/updatable';

export interface TaskOption {
  id: string;
  title: string;
  order: string;
  description: string
  userId: string | null;
  boardId: string;
  columnId: string;
}

export class Task extends Updatable {
  id: string;

  title: string;

  order: string;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  static tasks: Task[] = [];

  constructor({
    id = uuid(),
    title = 'title',
    order = 'order',
    description = 'description',
    userId,
    boardId,
    columnId,
  }: TaskOption) {
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
    return [...Task.tasks];
  }

  static getTaskByBoardId(boardId: string) {
    return Task.getTasks()
      .filter((task) => task.boardId === boardId);
  }

  static getTaskById(id: string) {
    return Task.getTasks().find((task) => task.id === id);
  }

  static add(task: Task) {
    Task.tasks.push(task);
    return task;
  }

  static updateById(id: string, data: UpdateData) {
    return Task.getTaskById(id)?.update(data);
  }

  static deleteById(id: string) {
    const index = Task.tasks.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    return Task.tasks.splice(index, 1)[0];
  }

  setUserId(id: string | null) {
    this.userId = id;
  }
}
