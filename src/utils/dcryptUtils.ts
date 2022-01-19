import bcrypt from 'bcrypt';
import util from 'util';
import { PRIVATE_KEY } from '../common/config';

const asyncHash = util.promisify(bcrypt.hash);
const asyncCompare = util.promisify(bcrypt.compare);

export const hash = async (data: string) => {
  if (!PRIVATE_KEY) {
    throw new Error('PRIVATE_KEY is miss');
  }

  const result = await asyncHash(data, +PRIVATE_KEY);

  return result;
};

export const compare = async (data: string, hashedData: string) => {
  const result = await asyncCompare(data, hashedData);

  return result;
};
