import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly userService: UserService) {
    this.userService.createAdmin();
  }

  @Get()
  getAll(): Promise<GetUserDto[]> {
    return this.userService.getAll();
  }

  @Get(':userId')
  getOne(@Param('userId') id: string): Promise<GetUserDto> {
    return this.userService.getUser(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() creatUserDto: CreateUserDto): Promise<GetUserDto | undefined> {
    return this.userService.createUser(creatUserDto);
  }

  @Put(':userId')
  update(@Param('userId') id: string, @Body() updateUserDto: UpdateUserDto): Promise<GetUserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param('userId') id: string) {
    return this.userService.deleteUser(id);
  }
}
