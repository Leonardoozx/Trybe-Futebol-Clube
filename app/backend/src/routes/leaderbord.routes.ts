import * as express from 'express';
import LeaderbordController from '../controllers/leaderbord.controller';

class LeaderbordRoutes {
  public router: express.Router;
  private _leaderbordController: LeaderbordController;
  constructor() {
    this.router = express.Router();
    this._leaderbordController = new LeaderbordController();
    this._allRoutes();
  }

  private _allRoutes = () => {
    this.router.get('/home', this._leaderbordController.getHomeTeams);
  };
}

export default LeaderbordRoutes;
