import Team from '../database/models/Team';

class TeamsServices {
  public getAllTeams = () => Team.findAll();

  public getTeamById = async (id: string) => {
    const teamById = await Team.findOne({ where: { id } });
    return teamById;
  };
}

export default TeamsServices;
