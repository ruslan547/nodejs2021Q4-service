import jwt from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compare } from '../../utils/dcryptUtils';
import { PRIVATE_KEY } from '../../common/config';
import { User } from '../users/user.model';
import { LoginDto } from './dto/login.dto';
import { GetLoginDto } from './dto/get-login.dto';

@Injectable()
export class LoginService {
  // eslint-disable-next-line no-useless-constructor
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  login = async (data: LoginDto): Promise<GetLoginDto> => {
    const { login, password } = data;

    if (!login || !password) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({ login: data.login });

    if (!user) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const isLogin = await compare(password.toString(), user.password);

    if (!isLogin) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    if (!PRIVATE_KEY) {
      throw new HttpException('PRIVATE_KEY is miss', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return {
      ...User.toResponse(user),
      token: jwt.sign({ userId: user.id, login: user.login }, PRIVATE_KEY),
    };
  };
}
