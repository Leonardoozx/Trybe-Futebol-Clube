import * as express from 'express';
import * as jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const verifyLoginHeader: express.RequestHandler = (req, res, next) => {
  const { headers } = req;
  const token = headers.authorization;
  if (!token) return res.status(400).json({ message: 'Unauthorized user' });
  const tokenValidation = jwt.verify(token, JWT_SECRET as string);
  if (!tokenValidation) { return res.status(401).json({ message: 'invalid token' }); }
  next();
};

export default verifyLoginHeader;
