import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

class TeamsRoutes {
  public router: express.Router;
  private _teamsController: TeamsController;
  constructor() {
    this.router = express.Router();
    this._teamsController = new TeamsController();
    this.getAllTeams();
  }

  private getAllTeams = async () => {
    this.router.get('/', this._teamsController.getAllTeams);
    this.router.get('/:id', this._teamsController.getTeamById);
  };
}

export default TeamsRoutes;
