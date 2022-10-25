import User from '../database/models/User';

class UserServices {
  public findAllUsers = async () => User.findAll();

  public findUserByEmail = (email: string) => User.findOne({ where: { email } });
}

export default UserServices;
