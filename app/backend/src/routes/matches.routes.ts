import * as express from 'express';
import MatchMiddlewares from '../middlewares/matchesMiddlewares';
import MatchesController from '../controllers/matches.controller';
import verifyToken from '../middlewares/verifyToken';

class MatchesRoutes {
  public router: express.Router;
  private _matchesController: MatchesController;
  private _matchMiddlewares: MatchMiddlewares;

  constructor() {
    this.router = express.Router();
    this._matchesController = new MatchesController();
    this._matchMiddlewares = new MatchMiddlewares();
    this.getMatchesRoutes();
  }

  private getMatchesRoutes = () => {
    this.router.get('/', this._matchesController.getAllMatches);
    this.router.get('/', this._matchesController.getMatchesByQuery);
    this.router.post(
      '/',
      verifyToken,
      this._matchMiddlewares.verifyTeams,
      this._matchMiddlewares.verifyIfTeamExists,
      this._matchesController.insertMatch,
    );
    this.router.patch('/:id/finish', this._matchesController.finishMatch);
    this.router.patch('/:id', this._matchesController.updateMatch);
  };
}
export default MatchesRoutes;
