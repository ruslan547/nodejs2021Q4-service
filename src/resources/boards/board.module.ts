import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/task.model';
import { TaskService } from '../task/task.service';
import { BoardController } from './board.controller';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { BoardColumn } from './column.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardColumn, Task])],
  controllers: [BoardController],
  providers: [BoardService, TaskService],
})
export class BoardModule {}
