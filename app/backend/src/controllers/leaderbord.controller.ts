import * as express from 'express';
import sortLeaderboardTeams from '../utils/sortLeaderboardTeams';
import LeaderbordServices from '../services/leaderbord.service';

class LeaderbordController {
  constructor(private _leaderbordServices = new LeaderbordServices()) {}

  public getHomeTeams: express.RequestHandler = async (_req, res) => {
    const allHomeTeams = await this._leaderbordServices.getHomeTeams();
    res.status(200).json(sortLeaderboardTeams(allHomeTeams));
  };
}

export default LeaderbordController;
