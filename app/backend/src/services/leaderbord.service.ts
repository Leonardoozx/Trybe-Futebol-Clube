/* eslint-disable max-lines-per-function */
// import IMatches from '../interfaces/IMatches';
import ILeaderboard from '../interfaces/ILeaderbord';
import MatchesServices from './matches.service';
import TeamsServices from './teams.service';

class LeaderbordServices {
  constructor(
    private _matchServices = new MatchesServices(),
    private _teamsServices = new TeamsServices(),
  ) {}

  private _getMatchPoints = (
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): number => {
    if (homeTeamGoals > awayTeamGoals) return 3;
    if (homeTeamGoals === awayTeamGoals) return 1;
    return 0;
  };

  private _allHomeTeams = async () => {
    const allMatches = await this._matchServices.getAllEndedMatches();
    const allTeamsInfos: ILeaderboard[] = [];
    await Promise.all(
      allMatches.map(async (team) => {
        const teamById = await this._teamsServices.getTeamById(
          String(team.homeTeam),
        );
        for (let i = 0; i < allTeamsInfos.length; i += 1) {
          if (allTeamsInfos[i].name === teamById?.teamName) return;
        }
        allTeamsInfos.push({
          name: teamById?.teamName,
          totalPoints: 0,
          totalGames: 0,
          totalVictories: 0,
          totalDraws: 0,
          totalLosses: 0,
          goalsFavor: 0,
          goalsOwn: 0,
          goalsBalance: 0,
          efficiency: '',
        });
      }),
    );
    return Promise.all(allTeamsInfos);
  };

  public getHomeTeams = async () => {
    const allMatches = await this._matchServices.getAllEndedMatches();
    const allTeamsInfos = await this._allHomeTeams();
    await Promise.all(
      allMatches.map(async (team) => {
        const teamById = await this._teamsServices.getTeamById(
          String(team.homeTeam),
        );
        const matchPoints = this._getMatchPoints(
          team.homeTeamGoals,
          team.awayTeamGoals,
        );
        for (let i = 0; i < allTeamsInfos.length; i += 1) {
          if (allTeamsInfos[i].name === teamById?.teamName) {
            allTeamsInfos[i].totalPoints += this._getMatchPoints(
              team.homeTeamGoals,
              team.awayTeamGoals,
            );
            allTeamsInfos[i].totalGames += 1;
            allTeamsInfos[i].goalsFavor += team.homeTeamGoals;
            allTeamsInfos[i].goalsOwn += team.awayTeamGoals;
            allTeamsInfos[i].totalVictories += matchPoints === 3 ? 1 : 0;
            allTeamsInfos[i].totalDraws
              += team.awayTeamGoals === team.homeTeamGoals ? 1 : 0;
            allTeamsInfos[i].totalLosses += matchPoints === 0 ? 1 : 0;
            return;
          }
        }
      }),
    );
    return Promise.all(
      allTeamsInfos
        .map((team) => ({
          ...team,
          goalsBalance: team.goalsFavor - team.goalsOwn,
          efficiency: String(
            ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
          ),
        })),
    );
  };

  public getAwayTeams = async () => {
    const allMatches = await this._matchServices.getAllEndedMatches();
    const allTeamsInfos = await this._allHomeTeams();
    await Promise.all(
      allMatches.map(async (team) => {
        const teamById = await this._teamsServices.getTeamById(
          String(team.awayTeam),
        );
        const matchPoints = this._getMatchPoints(
          team.awayTeamGoals,
          team.homeTeamGoals,
        );
        for (let i = 0; i < allTeamsInfos.length; i += 1) {
          if (allTeamsInfos[i].name === teamById?.teamName) {
            allTeamsInfos[i].totalPoints += this._getMatchPoints(
              team.awayTeamGoals,
              team.homeTeamGoals,
            );
            allTeamsInfos[i].totalGames += 1;
            allTeamsInfos[i].goalsFavor += team.awayTeamGoals;
            allTeamsInfos[i].goalsOwn += team.homeTeamGoals;
            allTeamsInfos[i].totalVictories += matchPoints === 3 ? 1 : 0;
            allTeamsInfos[i].totalDraws
              += team.homeTeamGoals === team.awayTeamGoals ? 1 : 0;
            allTeamsInfos[i].totalLosses += matchPoints === 0 ? 1 : 0;
            return;
          }
        }
      }),
    );
    return Promise.all(
      allTeamsInfos
        .map((team) => ({
          ...team,
          goalsBalance: (team.goalsFavor - team.goalsOwn),
          efficiency: String(
            ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
          ),
        })),
    );
  };

  public getAllTeams = async () => {
    const allHomeTeams = await this.getHomeTeams();
    const allAwayTeams = await this.getAwayTeams();
    const allTeams: ILeaderboard[] = [];
    await Promise.all(
      allHomeTeams.map(async (homeTeam) => {
        for (let i = 0; i < allAwayTeams.length; i += 1) {
          const awayTeam = allAwayTeams[i];
          if (homeTeam.name === awayTeam.name) {
            allTeams.push({
              name: homeTeam.name,
              totalPoints: homeTeam.totalPoints + awayTeam.totalPoints,
              totalGames: homeTeam.totalGames + awayTeam.totalGames,
              totalVictories: homeTeam.totalVictories + awayTeam.totalVictories,
              totalDraws: homeTeam.totalDraws + awayTeam.totalDraws,
              totalLosses: homeTeam.totalLosses + awayTeam.totalLosses,
              goalsFavor: homeTeam.goalsFavor + awayTeam.goalsFavor,
              goalsOwn: homeTeam.goalsOwn + awayTeam.goalsOwn,
              goalsBalance: 0,
              efficiency: '',
            });
          }
        }
      }),
    );
    return Promise.all(
      allTeams
        .map((team) => ({
          ...team,
          goalsBalance: (team.goalsFavor) - team.goalsOwn,
          efficiency: String(
            ((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2),
          ),
        })),
    );
  };
}

export default LeaderbordServices;
