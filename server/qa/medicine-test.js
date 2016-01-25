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
  let user2 = {
    email: 'trump2016@whitehouse.gov',
    password: 'no'
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
  let token2;

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

  before((done) => {
    request(url)
      .post('/user/signup')
      .send(user2)
      .expect(201)
      .end((err, res) => {
        expect(res.headers['authorization']).to.exist;
        expect(res.headers['authorization']).to.be.a('string');
        token2 = res.headers['authorization'];
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

  describe('PUT /api/medications/:id', () => {

    it('should update medication info', (done) => {
      medication.info.instruct = 'Take once in the morning and once at night';
      request(url)
        .put('/api/medications/1')
        .set('Authorization', token)
        .send(medication)
        .expect(200, done);
    });

    it('should update only the taken property', (done) => {
      medication.taken = [true, true, true, false];
      request(url)
        .put('/api/medications/1')
        .set('Authorization', token)
        .send(medication)
        .expect(200, done);
    });

    it('should not allow other users to update a medication that\'s not theirs', (done) => {
      medication.info.instruct = 'Take twice';
      request(url)
        .put('/api/medications/1')
        .set('Authorization', token2)
        .send(medication)
        .expect(401, done);
    });
  });

  describe('DELETE /api/medications', () => {

    it('should not allow other users to delete a medication that\'s not theirs', (done) => {
      request(url)
        .delete('/api/medications/1')
        .set('Authorization', token2)
        .expect(401, done);
    });

    it('should delete medication', (done) => {
      request(url)
        .delete('/api/medications/1')
        .set('Authorization', token)
        .expect(200, done);
    });
  });

});
