import * as express from 'express';
import createJWT from '../utils/createJWT';

class LoginController {
  public login: express.RequestHandler = (req, res) => {
    const { body } = req;
    console.log(body);
    const token = createJWT(body?.email);
    res.status(200).json({ token });
  };
}

export default LoginController;
