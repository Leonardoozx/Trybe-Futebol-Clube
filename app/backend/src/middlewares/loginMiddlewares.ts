import * as express from 'express';
import * as bcrypt from 'bcryptjs';

import UserServices from '../services/user.service';
import loginValidation from '../services/validation/loginValidation';

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
}

export default LoginMiddlewares;
