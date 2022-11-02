import * as chai from 'chai';
import { expect } from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
// import * as sinon from 'sinon';
// @ts-ignore
chai.use(chaiHttp);

import { app } from '../app';
import { allMatchesMock } from './mock/matchesMock';

describe('/matches - Matches requests', () => {
  it('must return all the matches when requesting /matches', async () => {
    const httpResponse = await chai
      .request(app)
      .get('/matches')
    expect((httpResponse.body).length).to.deep.equal(allMatchesMock.length);
  });
});
