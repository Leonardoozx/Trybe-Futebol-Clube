import * as express from 'express';
import LoginMiddlewares from '../middlewares/loginMiddlewares';
import LoginController from '../controllers/login.controller';
import verifyToken from '../middlewares/verifyToken';

class LoginRoutes {
  public router: express.Router;
  private loginController: LoginController;
  private loginMiddlewares: LoginMiddlewares;
  constructor() {
    this.router = express.Router();
    this.loginController = new LoginController();
    this.loginMiddlewares = new LoginMiddlewares();
    this.allRoutes();
  }

  public allRoutes = (): void => {
    this.router.post(
      '/',
      this.loginMiddlewares.verifyLoginFields,
      this.loginController.login,
    );
    this.router.get(
      '/validate',
      verifyToken,
      this.loginController.loginValidate,
    );
  };
}

export default LoginRoutes;
