import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

import UserServices from './user.service';

const { JWT_SECRET } = process.env;

class LoginServices {
  private userServices: UserServices;

  constructor() { this.userServices = new UserServices(); }

  public getUserRole = async (headers: { authorization: '' }) => {
    const auth = headers.authorization;
    const user = jwt.verify(auth as string, JWT_SECRET as string);
    const { email } = <{ email: '' }>user;
    const userInfos = await this.userServices.findUserByEmail(email as string);
    const role = userInfos?.role;
    return role;
  };
}

export default LoginServices;
