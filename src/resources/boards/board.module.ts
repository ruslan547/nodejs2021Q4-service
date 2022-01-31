import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { Board } from './board.model';
import { BoardService } from './board.service';
import { BoardColumn } from './column.model';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardColumn])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
