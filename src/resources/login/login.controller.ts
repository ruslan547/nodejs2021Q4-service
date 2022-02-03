import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { GetUserDto } from '../users/dto/get-user.dto';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly loginService: LoginService) {}

  @Post()
  login(@Body() loginDto: LoginDto): Promise<GetUserDto> {
    return this.loginService.login(loginDto);
  }
}
