const { v4: uuid } = require('uuid');

const { Updatable } = require('../../common/entity/updatable');

const users = [];

class User extends Updatable {
  constructor({
    id = uuid(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  }) {
    super();

    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }

  static getUsers() {
    return [...users];
  }

  static getById(id) {
    const user = users.find(item => item.id === id);
    return user ?? null;
  }

  static add(user) {
    users.push(user);
    return user;
  }

  static updateById(id, data) {
    const user = User.getById(id);
    return user ? user.update(data) : null;
  }

  static deleteById(id) {
    const index = users.findIndex(item => item.id === id);
    return (index !== -1) ? users.splice(index, 1)[0] : null;
  }
}

module.exports = { User };
