import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import UserServices from '../services/user.service';
import loginValidation from '../services/validation/loginValidation';

const { JWT_SECRET } = process.env;

class LoginMiddlewares {
  public verifyLoginFields: express.RequestHandler = async (req, res, next) => {
    const { body } = req;
    const { error } = loginValidation.validate(body);
    if (error) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await new UserServices().findUserByEmail(body.email);
    if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
    const userPass = user.password as string;
    const passValidation = await bcrypt.compare(body.password, userPass);
    if (user.email !== body.email || !passValidation) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  };

  public verifyLoginHeader: express.RequestHandler = (req, res, next) => {
    const { headers } = req;
    const token = headers.authorization;
    if (!token) return res.status(400).json({ message: 'Unauthorized user' });
    const tokenValidation = jwt.verify(token, JWT_SECRET as string);
    if (!tokenValidation) return res.status(401).json({ message: 'invalid token' });
    next();
  };
}

export default LoginMiddlewares;
