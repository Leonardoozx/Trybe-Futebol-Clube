import * as express from 'express';
import verifyLoginFields from '../middlewares/loginMiddlewares';
import LoginController from '../controllers/login.controller';

class LoginRoutes {
  public router: express.Router;
  private loginController: LoginController;
  constructor() {
    this.router = express.Router();
    this.loginController = new LoginController();
    this.allRoutes();
  }

  public allRoutes = (): void => {
    this.router.post('/', verifyLoginFields, this.loginController.login);
  };
}
const router = express.Router();

const loginController = new LoginController();
router.post('/', verifyLoginFields, loginController.login);

export default LoginRoutes;
