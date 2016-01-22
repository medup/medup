'use strict';

const request = require('supertest'),
      mocha = require('mocha'),
      expect = require('Chai').expect;

describe('API endpoint /api/medications', () => {

  let url = 'http://localhost:3003';
  let medication = {
    name: 'Amaryl',
    instruct: 'Take once a day',
    owner: 1
  };

  describe('POST /api/medications', () => {

    it('should save list of medications to database', (done) => {
      request(url)
        .post('/api/medications')
        .send(medication)
        .expect(201, done);
    });

  });

  describe('GET /api/medications', () => {

    it('should get list of medications from database', (done) => {
      request(url)
        .get('/api/medications')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.body.medication).to.be.an('array');
          expect(res.body.medication).to.equal(medication);
          done();
        });
    });

  });

});
