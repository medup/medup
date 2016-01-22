'use strict';

const request = require('supertest'),
      mocha = require('mocha'),
      expect = require('Chai').expect;

describe('API endpoint /api/medications', () => {

  let url = 'http://localhost:3003';
  let medications = [
    'Amaryl',
    'Dabigatran',
    'Halaven',
    'Paclitaxel'
  ];

  describe('POST /api/medications', () => {

    it('should save list of medications to database', (done) => {
      request(url)
        .post('/api/medications')
        .send(medications)
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
          expect(res.body.medications).to.be.an('array');
          expect(res.body.medications).to.equal(medications);
          done();
        });
    });

  });

});
