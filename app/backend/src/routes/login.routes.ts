import * as express from 'express';
import LoginMiddlewares from '../middlewares/loginMiddlewares';
import LoginController from '../controllers/login.controller';

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
      this.loginMiddlewares.verifyLoginHeader,
      this.loginController.loginValidate,
    );
  };
}

export default LoginRoutes;
