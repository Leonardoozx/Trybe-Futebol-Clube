import User from '../models/User';

class UserServices {
  public findAllUsers = async () => User.findAll();
}

export default UserServices;
