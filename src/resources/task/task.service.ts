import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.model';

@Injectable()
export class TaskService {
  // eslint-disable-next-line no-useless-constructor
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

  /**
   * Returns all tasks
   * @returns array of tasks, Task[]
   */
  getAll = async (
    boardId: FindCondition<string> | undefined,
  ): Promise<GetTaskDto[]> => await this.taskRepository.find({ boardId }) ?? [];

  /**
   * Returns Task or undefined
   * @param id id of task
   * @returns Task or undefined
   */
  getById = async (id: FindCondition<string> | undefined): Promise<GetTaskDto> => {
    const task = await this.taskRepository.findOne({ id });

    if (!task) {
      throw new HttpException('Not found', 404);
    }

    return task;
  };

  /**
   * Returns Task
   * @param data task's data
   * @returns Task
   */
  create = (
    boardId: FindCondition<string> | undefined,
    data: CreateTaskDto,
  ) => {
    const task = new Task();

    task.boardId = boardId as string;
    task.title = data.title ?? 'title';
    task.order = +data.order ?? 1;
    task.description = data.description ?? 'description';
    task.columnId = data.columnId ?? null;
    task.userId = data.userId;

    return this.taskRepository.save(task);
  };

  /**
   * Returns Task or undefined
   * @param id task's id
   * @param data task's update data
   * @returns Task or undefined
   */
  update = async (
    id: FindCondition<string> | undefined,
    data: UpdateTaskDto,
  ) => {
    const foundTask = await this.taskRepository.findOne({ id });

    if (!foundTask) {
      throw new HttpException('Not found', 404);
    }

    foundTask.update(data);

    return this.taskRepository.save(foundTask);
  };

  /**
   * Returns Task or null
   * @param id task's id
   * @returns Task or null
   */
  deleteById = async (id: FindCondition<string> | undefined) => {
    const foundTask = await this.taskRepository.findOne({ id });

    if (!foundTask) {
      throw new HttpException('Not found', 404);
    }

    return this.taskRepository.remove(foundTask);
  };
}
