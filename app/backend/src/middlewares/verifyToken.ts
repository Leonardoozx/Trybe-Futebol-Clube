import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const verifyLoginHeader: express.RequestHandler = (req, res, next) => {
  const { headers } = req;
  const token = headers.authorization;
  if (!token) return res.status(400).json({ message: 'Unauthorized user' });
  try {
    jwt.verify(token, JWT_SECRET as string);
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default verifyLoginHeader;
