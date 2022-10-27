import * as express from 'express';
import LoginRoutes from './routes/login.routes';
import TeamsRoutes from './routes/teams.routes';
import MatchesRoutes from './routes/matches.routes';
import LeaderbordRoutes from './routes/leaderbord.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.get('/', (_req, res) => res.json({ ok: true }));
    this.app.use('/login', new LoginRoutes().router);
    this.app.use('/teams', new TeamsRoutes().router);
    this.app.use('/matches', new MatchesRoutes().router);
    this.app.use('/leaderbord', new LeaderbordRoutes().router);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
