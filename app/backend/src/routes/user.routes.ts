import * as express from 'express';

class UserRoutes {
  public router: express.Router;
  constructor() {
    this.router = express.Router();
    this.allRoutes();
  }

  public allRoutes = (): void => {
    this.router.get('/', (_req, res) =>
      res.status(200).json({
        message: 'the route is trully working',
      }));
    this.router.get('/leonardo', (_req, res) => {
      res.status(200).json({ message: 'LEONARDOOddasdsasadsaOPIROCAONASDAOZOXZXZX' });
    });
  };
}

export default UserRoutes;
