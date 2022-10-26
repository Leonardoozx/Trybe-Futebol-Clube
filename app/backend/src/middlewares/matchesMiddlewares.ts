import * as express from 'express';

class MatchMiddlewares {
  public verifyTeams: express.RequestHandler = ({ body }, res, next) => {
    if (body.homeTeam === body.awayTeam) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }
    next();
  };
}

export default MatchMiddlewares;
