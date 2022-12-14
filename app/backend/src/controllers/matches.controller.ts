import * as express from 'express';
import IMatchUpdate from '../interfaces/IMatchUpdate';

import MatchesServices from '../services/matches.service';

class MatchesController {
  constructor(private _matchesServices = new MatchesServices()) {}

  public getAllMatches: express.RequestHandler = async ({ query }, res, next) => {
    if (query.inProgress) return next();
    const allMatches = await this._matchesServices.getAllMatches();
    res.status(200).json(allMatches);
  };

  public getMatchesByQuery: express.RequestHandler = async ({ query }, res) => {
    if (query.inProgress) {
      const searchQuery = query.inProgress === 'true' ? 1 : 0;
      const matchesByQuery = await this._matchesServices.getMatchesByQuery(searchQuery);
      return res.status(200).json(matchesByQuery);
    }
  };

  public insertMatch: express.RequestHandler = async ({ body }, res) => {
    const insertedMatch = await this._matchesServices.insertMatch(body);
    res.status(201).json(insertedMatch);
  };

  public finishMatch: express.RequestHandler = async ({ params }, res) => {
    await this._matchesServices.finishMatch(+params.id as number);
    res.status(200).json({ message: 'Finished' });
  };

  public updateMatch: express.RequestHandler = async ({ params, body }, res) => {
    await this._matchesServices.updateMatch(params.id as string, body as IMatchUpdate);
    res.status(200).json(({ message: 'Match updated!' }));
  };
}

export default MatchesController;
