import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { userFindAllMock } from './mock/userModelMocks';
import User from '../database/models/User';
import UserServices from '../services/user.service';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing the User Model', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon.stub(User, 'findAll').resolves([
      ...userFindAllMock,
    ] as User[]);
  });

  afterEach(() => {
    (User.findAll as sinon.SinonStub).restore();
  });

  it.only('tests if the it is possible to get all the users from DB', async () => {
    const userServices = new UserServices();
    const allUsers = await userServices.findAllUsers();
    expect(allUsers).eq(userFindAllMock);
  
  });

  // it('Seu sub-teste', () => {
  //   expect(false).to.be.eq(true);
  // });
});
