import bcrypt from 'bcrypt';
import util from 'util';
import { SALT_ROUNDS } from '../common/config';

const asyncHash = util.promisify(bcrypt.hash);
const asyncCompare = util.promisify(bcrypt.compare);

export const hash = async (data: string) => {
  if (!SALT_ROUNDS) {
    throw new Error('SALT_ROUNDS is miss');
  }

  const saltRounds = +SALT_ROUNDS;

  if (!Number.isInteger(saltRounds)) {
    throw new Error('SALT_ROUNDS is not integer');
  }

  const result = await asyncHash(data, saltRounds);

  return result;
};

export const compare = async (data: string, hashedData: string) => {
  const result = await asyncCompare(data, hashedData);

  return result;
};
