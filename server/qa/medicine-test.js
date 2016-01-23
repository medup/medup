'use strict';

const request = require('supertest'),
      mocha = require('mocha'),
      expect = require('Chai').expect;

describe('API endpoint /api/medications', () => {

  let url = 'http://localhost:3003';
  let user = {
    email: 'jonsnow@knowsnothing.org',
    password: 'stillknowsnothing'
  };
  let medication = {
    info: {
      name: 'Amaryl',
      instruct: 'Take once a day'
    }
  };
  let medicationTwo = {
    info: {
      name: 'Tamaryl',
      instruct: 'Take twice a day'
    }
  };
  let token;

  before((done) => {
    request(url)
      .post('/user/signin')
      .send(user)
      .expect(202)
      .end((err, res) => {
        expect(res.headers['authorization']).to.exist;
        expect(res.headers['authorization']).to.be.a('string');
        token = res.headers['authorization'];
        done();
      });
  });

  describe('POST /api/medications', () => {

    it('should save list of medications to database', (done) => {
      request(url)
        .post('/api/medications')
        .set('Authorization', token)
        .send(medication)
        .expect(201, done);
    });

  });

  describe('GET /api/medications', () => {

    before((done) => {
      request(url)
        .post('/api/medications')
        .set('Authorization', token)
        .send(medicationTwo)
        .end((err, res) => {
          done();
        });
    });

    it('should get list of medications from database', (done) => {
      request(url)
        .get('/api/medications')
        .set('Authorization', token)
        .expect(200)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body).to.be.an('array');
          expect(res.body[0].info.name).to.equal(medication.info.name);
          done();
        });
    });
  });
});
