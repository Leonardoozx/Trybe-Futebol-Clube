import { Model, INTEGER } from 'sequelize';
import Team from './Team';
import db from '.';

class Match extends Model {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
}

Match.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    homeTeam: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: INTEGER,
      allowNull: false,
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'matches',
    timestamps: false,
  },
);

Match.belongsToMany(Team, { foreignKey: 'homeTeam', through: Match, as: 'home_team' });
Match.belongsToMany(Team, { foreignKey: 'awayTeam', through: Match, as: 'away_team' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'home_team' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'away_team' });

export default Match;
