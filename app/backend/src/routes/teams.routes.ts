import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

class TeamsRoutes {
  public router: express.Router;
  private teamsController: TeamsController;
  constructor() {
    this.router = express.Router();
    this.teamsController = new TeamsController();
    this.getAllTeams();
  }

  private getAllTeams = async () => {
    this.router.get('/', this.teamsController.getAllTeams);
    this.router.get('/:id', this.teamsController.getTeamById);
  };
}

export default TeamsRoutes;
