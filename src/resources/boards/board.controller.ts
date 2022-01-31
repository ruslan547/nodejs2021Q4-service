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
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { GetBoardDto } from './dto/get-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly boardService: BoardService) {}

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
}
