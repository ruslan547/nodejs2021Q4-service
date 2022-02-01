import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './task.service';

@Controller('boards/:boardId/tasks')
export class TaskController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly taskService: TaskService) {}

  @Get('boards/:boardId')
  getAll(@Param('boardId') id: string): Promise<GetTaskDto[]> {
    return this.taskService.getAll(id);
  }

  @Get(':taskId')
  getOne(@Param('taskId') id: string): Promise<GetTaskDto> {
    return this.taskService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() creatTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ): Promise<GetTaskDto | undefined> {
    return this.taskService.create(boardId, creatTaskDto);
  }

  @Put(':taskId')
  update(
    @Param('taskId') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<GetTaskDto> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':taskId')
  remove(@Param('taskId') id: string) {
    return this.taskService.deleteById(id);
  }
}
