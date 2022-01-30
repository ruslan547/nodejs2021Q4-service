import jwt from 'jsonwebtoken';
import { compare } from '../../utils/dcryptUtils';
// import { getAll } from '../users/user.service';
import { PRIVATE_KEY } from '../../common/config';
import { User } from '../users/user.model';
import { ClientError } from '../../common/errors/clientError';

interface LoginData {
  login: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const password = data.password.toString();
  // const users = await getAll();
  const users: User[] = [];
  const user = users?.find((item) => item.login === data.login);

  if (!user) {
    throw new ClientError('Forbidden', 403);
  }

  const isLogin = await compare(password, user.password);

  if (!isLogin) {
    throw new ClientError('Forbidden', 403);
  }

  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is miss');
  }

  return {
    ...User.toResponse(user),
    token: jwt.sign({ userId: user.id, login: user.login }, PRIVATE_KEY),
  };
};
