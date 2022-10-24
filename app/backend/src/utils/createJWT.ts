import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const createJWT = (email: string) => {
  const token = jwt.sign({ email }, JWT_SECRET as string);
  return token;
};

export default createJWT;
