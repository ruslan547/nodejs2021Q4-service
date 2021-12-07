import { v4 as uuid } from 'uuid';
import { Updatable, UpdateData } from '../../common/entity/updatable';

const users: User[] = [];

export interface UserOptions {
  id: string;
  name: string;
  login: string;
  password: string;
}

export class User extends Updatable {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }: UserOptions) {
    super();

    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static getUsers() {
    return [...users];
  }

  static getById(id: string) {
    const user = users.find(item => item.id === id);
    return user ?? null;
  }

  static add(user: User) {
    users.push(user);
    return user;
  }

  static updateById(id: string, data: UpdateData) {
    const user = User.getById(id);
    return user ? user.update(data) : null;
  }

  static deleteById(id: string) {
    const index = users.findIndex(item => item.id === id);
    return (index !== -1) ? users.splice(index, 1)[0] : null;
  }
}
