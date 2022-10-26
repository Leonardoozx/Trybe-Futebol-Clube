import Team from '../database/models/Team';
import Match from '../database/models/Match';

class TeamsServices {
  public getAllMatches = () =>
    Match.findAll({
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

  public getMatchesByQuery = (query: number) =>
    Match.findAll({
      where: { inProgress: query },
      include: [
        {
          model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

  public insertMatch = (body: object) => Match.create({ ...body, inProgress: true });
}

export default TeamsServices;
