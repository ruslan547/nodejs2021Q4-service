import { FindCondition, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.model';
import { hash } from '../../utils/dcryptUtils';
import { GetUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Task } from '../task/task.model';

@Injectable()
export class UserService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}

  /**
   * Returns all users
   * @returns array of users, User[]
   */
  getAll = async (): Promise<GetUserDto[]> => {
    const users = await this.userRepository.find() ?? [];

    return users.map(User.toResponse);
  }

  /**
   * Returns User or null
   * @param id id of user
   * @returns User or null
   */
  getUser = async (id: FindCondition<string> | undefined) => {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException('Not found', 404);
    }

    return user;
  };

  /**
   * Returns User
   * @param data user's data
   * @returns User
   */
  createUser = async (data: CreateUserDto) => {
    const password = await hash(data.password.toString());
    const user = await this.userRepository.save({ ...data, password });

    return User.toResponse(user);
  };

  /**
   * Returns User or null
   * @param id user's id
   * @param data user's update data
   * @returns User or null
   */
  updateUser = async (
    id: FindCondition<string> | undefined,
    data: UpdateUserDto,
  ) => {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException('Not found', 404);
    }

    user.update(data);

    return this.userRepository.save(user);
  };

  /**
   * Returns User or null
   * @param id user's id
   * @returns User or null
   */
  deleteUser = async (userId: FindCondition<string> | undefined) => {
    const user = await this.userRepository.findOne({ id: userId });

    if (!user) {
      throw new HttpException('Not found', 404);
    }

    const tasks = await this.taskRepository.find({ userId });

    tasks.forEach(async (item) => {
      // eslint-disable-next-line no-param-reassign
      item.userId = null;
      await this.taskRepository.save(item);
    });

    return this.userRepository.remove(user);
  };
}
