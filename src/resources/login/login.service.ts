import jwt from 'jsonwebtoken';
import { compare } from '../../utils/dcryptUtils';
import { getAll } from '../users/user.service';
import { PRIVATE_KEY } from '../../common/config';
import { User } from '../users/user.model';

interface LoginData {
  login: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const password = data.password.toString();
  const users = await getAll();
  const user = users?.find((item) => item.login === data.login);
  const isLogin = user && compare(password, user.password);

  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is miss');
  }

  if (isLogin) {
    return {
      ...User.toResponse(user),
      token: jwt.sign({ id: user.id }, PRIVATE_KEY),
    };
  }

  return null;
};
