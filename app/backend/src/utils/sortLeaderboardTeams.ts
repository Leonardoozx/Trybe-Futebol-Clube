import ILeaderboard from '../interfaces/ILeaderbord';

const sortLeaderboardTeams = (teams: ILeaderboard[]) => teams.sort(
  (a, b) =>
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn,
);

export default sortLeaderboardTeams;
