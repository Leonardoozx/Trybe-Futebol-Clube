import * as express from 'express';
import sortLeaderboardTeams from '../utils/sortLeaderboardTeams';
import LeaderbordServices from '../services/leaderbord.service';

class LeaderbordController {
  constructor(private _leaderboardServices = new LeaderbordServices()) {}

  public getHomeTeams: express.RequestHandler = async (_req, res) => {
    const allHomeTeams = await this._leaderboardServices.getHomeTeams();
    res.status(200).json(sortLeaderboardTeams(allHomeTeams));
  };

  public getAwayTeams: express.RequestHandler = async (_req, res) => {
    const allAwayTeams = await this._leaderboardServices.getAwayTeams();
    res.status(200).json(sortLeaderboardTeams(allAwayTeams));
  };
}

export default LeaderbordController;
