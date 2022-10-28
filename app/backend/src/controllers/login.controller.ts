import * as express from 'express';
import LoginServices from '../services/login.service';
import createJWT from '../utils/createJWT';

class LoginController {
  constructor(private _loginServices = new LoginServices()) {}

  public login: express.RequestHandler = (req, res) => {
    const { body } = req;
    const token = createJWT(body.email);
    res.status(200).json({ token });
  };

  public loginValidate: express.RequestHandler = async (req, res) => {
    const { headers } = req;
    const role = await this._loginServices.getUserRole(<{ authorization:'' }>headers);
    res.status(200).json({ role });
  };
}

export default LoginController;
