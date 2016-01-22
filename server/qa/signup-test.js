'use strict';

const request = require('supertest'),
      mocha = require('mocha'),
      expect = require('Chai').expect;

describe('POST /signup', () => {

  let url = 'http://localhost:3003';
  let user = {
    email: 'jonsnow@knowsnothing.org',
    password: 'stillknowsnothing'
  };

  it('should response with status of 201 for successful signup POST operation', (done) => {
    request(url)
      .post('/user/signup')
      .send(user)
      .expect(201, done);
  });

  it('should return 409 for a user that already exists', (done) => {
    request(url)
      .post('/user/signup')
      .send(user)
      .expect(201)
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body).to.be.an('object');
        expect(res.body.email).to.equal('jonsnow@knowsnothing.org');
        done();
      });
  });

});

describe('POST /signin', () => {

  let url = 'http://localhost:3003';
  let nonUser = {
    email: 'trump2016@whitehouse.gov',
    password: 'no'
  };
  let existingUser = {
    email: 'jonsnow@knowsnothing.org',
    password: 'stillknowsnothing'
  };
  let token;

  it('should respond with status of 202 for successful signin POST operation', (done) => {
    request(url)
      .post('/user/signin')
      .send(existingUser)
      .expect(202, done);
  });

  it('should response with status of 404 for unsuccessful signin POST operation', (done) => {
    request(url)
      .post('/user/signin')
      .send(nonUser)
      .expect(404, done);
  });

  it('response header should include a token on successful signin', done => {
    request(url)
      .post('/user/signin')
      .send(existingUser)
      .expect(202)
      .end((err, res) => {
        expect(res.headers['authorization']).to.exist;
        expect(res.headers['authorization']).to.be.a('string');
        token = res.headers['authorization'];
        done();
      });
  });

  it('should allow a valid token to access /restricted routes', done => {
    request(url)
      .get('/restricted')
      .set('Authorization', token)
      .expect(200, done);
  });

  it('should respond with 401 for /restricted routes without a token', done => {
    request(url)
      .get('/restricted')
      .expect(401, done);
  });
});
