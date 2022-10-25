import * as express from 'express';
import TeamsServices from '../services/teams.service';

class TeamsController {
  constructor(private teamsServices = new TeamsServices()) {}

  public getAllTeams: express.RequestHandler = async (_req, res) => {
    const allTeams = await this.teamsServices.getAllTeams();
    res.status(200).json(allTeams);
  };

  public getTeamById: express.RequestHandler = async ({ params }, res) => {
    const teamById = await this.teamsServices.getTeamById(params.id as string);
    res.status(200).json(teamById);
  };
}

export default TeamsController;
