import IMatches from '../interfaces/IMatches';
import ILeaderbod from '../interfaces/ILeaderbord';
import MatchesServices from './matches.service';

class LeaderbordServices {
  constructor(private _matchServices = new MatchesServices()) {}

  public getHomeTeams = async () => {
    const allTeams = await this._matchServices.getAllMatches();
    const allTeamInfos: ILeaderbod[] = [];
    allTeams.forEach((team) => {
      allTeamInfos.push({
        name: team.teamHome.teamName as string,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: team.homeTeamGoals,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 'string',

      });
    });
    return allTeamInfos;
  };
}

export default LeaderbordServices;
