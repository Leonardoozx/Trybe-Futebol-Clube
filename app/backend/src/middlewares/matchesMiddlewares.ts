import * as express from 'express';
import TeamsServices from '../services/teams.service';

class MatchMiddlewares {
  constructor(private _teamsServices = new TeamsServices()) {}

  public verifyTeams: express.RequestHandler = ({ body }, res, next) => {
    if (body.homeTeam === body.awayTeam) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    next();
  };

  public verifyIfTeamExists: express.RequestHandler = async ({ body }, res, next) => {
    const homeTeam = await this._teamsServices.getTeamById(body.homeTeam);
    const awayTeam = await this._teamsServices.getTeamById(body.awayTeam);
    if (!homeTeam
      || !awayTeam) return res.status(404).json({ message: 'There is no team with such id!' });
    next();
  };
}

export default MatchMiddlewares;
