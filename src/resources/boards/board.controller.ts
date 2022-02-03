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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateTaskDto } from '../task/dto/create-task.dto';
import { GetTaskDto } from '../task/dto/get-task.dto';
import { UpdateTaskDto } from '../task/dto/update-task.dto';
import { TaskService } from '../task/task.service';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardDto } from './dto/get-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly boardService: BoardService,
    private readonly taskService: TaskService,
  ) {}

  @Get()
  getAll(): Promise<GetBoardDto[]> {
    return this.boardService.getAll();
  }

  @Get(':boardId')
  getOne(@Param('boardId') id: string): Promise<GetBoardDto> {
    return this.boardService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createBoardDto: CreateBoardDto): Promise<GetBoardDto> {
    return this.boardService.create(createBoardDto);
  }

  @Put(':boardId')
  update(
    @Param('boardId') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<GetBoardDto> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(':boardId')
  remove(@Param('boardId') id: string) {
    return this.boardService.deleteById(id);
  }

  @Get(':boardId/tasks')
  getAllTasks(@Param('boardId') id: string): Promise<GetTaskDto[]> {
    return this.taskService.getAll(id);
  }

  @Get(':boardId/tasks/:taskId')
  getOneTask(@Param('taskId') id: string): Promise<GetTaskDto> {
    return this.taskService.getById(id);
  }

  @Post(':boardId/tasks')
  @HttpCode(HttpStatus.CREATED)
  createTask(
    @Body() creatTaskDto: CreateTaskDto,
    @Param('boardId') boardId: string,
  ): Promise<GetTaskDto | undefined> {
    return this.taskService.create(boardId, creatTaskDto);
  }

  @Put(':boardId/tasks/:taskId')
  updateTask(
    @Param('taskId') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<GetTaskDto> {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':boardId/tasks/:taskId')
  removeTask(@Param('taskId') id: string) {
    return this.taskService.deleteById(id);
  }
}
