'use strict';

const request = require('supertest'),
      mocha = require('mocha'),
      expect = require('Chai').expect;

describe('POST /signup', () => {

  let url = 'http://localhost:3003';
  let user = {
    username: 'Jon Snow',
    password: 'knowsnothing'
  };

  it('should response with status of 201 for successful signup POST operation', (done) => {
    request(url)
      .post('/user/create')
      .send(user)
      .expect(201, done);
  });

});
