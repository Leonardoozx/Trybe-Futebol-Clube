import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import * as sinon from 'sinon';
// @ts-ignore
chai.use(chaiHttp);
import LoginServices from '../services/login.service';

import { app } from '../app';
import {
  emptyFieldsErrorMessage,
  emptyFieldsLoginMock,
  loginErrorMessage,
  rightFieldsLoginMock,
  rightTokenMock,
  tokenErrorMessage,
  userMock,
  withoutTokenErrorMessage,
  wrongEmailLoginPostMock,
  wrongPasswordLoginMock,
  wrongTokenMock,
} from './mock/loginMocks';

const { expect } = chai;

describe('/login - Login requests', () => {
  it('must return an error when trying to request with wrong email', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(wrongEmailLoginPostMock);
    expect(httpResponse.status).eq(401);
    expect(httpResponse.body).to.deep.equal(loginErrorMessage);
  });

  it('must return an error when trying to request with wrong password', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(wrongPasswordLoginMock);
    expect(httpResponse.status).eq(401);
    expect(httpResponse.body).to.deep.equal(loginErrorMessage);
  });

  it('must return an error when trying to request with empty fields', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(emptyFieldsLoginMock);
    expect(httpResponse.status).eq(400);
    expect(httpResponse.body).to.deep.equal(emptyFieldsErrorMessage);
  });

  it('tests if its possible to login with the right body request', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send(rightFieldsLoginMock);
    expect(httpResponse.status).eq(200);
    expect(httpResponse.body.token).equal(rightTokenMock);
  });

  describe('login/validate - login/validate requests', () => {
    const loginServices = new LoginServices();
    before(() =>
      sinon.stub(loginServices, 'getUserRole').resolves(userMock.role)
    );
    after(() => sinon.restore());
    it('tests if its possible to validate your login with a right token', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', rightTokenMock);
      expect(httpResponse.status).to.equals(200);
      expect(httpResponse.body).to.deep.equals({ role: userMock.role });
    });

    it('tests if its not possible to validate your login with a wrong token', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', wrongTokenMock);
      expect(httpResponse.status).to.equals(401);
      expect(httpResponse.body).to.deep.equals(tokenErrorMessage);
    });

    it('tests if its not possible to validate your login without a token', async () => {
      const httpResponse = await chai.request(app).get('/login/validate');
      expect(httpResponse.status).to.equals(400);
      expect(httpResponse.body).to.deep.equals(withoutTokenErrorMessage);
    });
  });
});
