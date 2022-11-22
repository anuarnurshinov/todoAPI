import * as bcrypt from 'bcrypt';

export const encodePassword = async (rawPass: string) => {
  const SALT = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPass, SALT);
};
export const comparePasswords = async (rawPass: string, hash: string) => {
  return bcrypt.compareSync(rawPass, hash);
};
