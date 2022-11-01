import IMatchUpdate from '../interfaces/IMatchUpdate';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

class MatchesServices {
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

  public getAllEndedMatches = async () =>
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
      where: { inProgress: 0 },
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

  public insertMatch = (body: object) =>
    Match.create({ ...body, inProgress: true });

  public finishMatch = async (id: number): Promise<void> => {
    await Match.update({ inProgress: false }, { where: { id } });
  };

  public updateMatch = async (id: string, body: IMatchUpdate) => {
    const { homeTeamGoals, awayTeamGoals } = body;
    await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default MatchesServices;
