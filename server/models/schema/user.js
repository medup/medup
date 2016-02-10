'use strict';

const crypto = require('crypto'),
      bcrypt = require('bcrypt-nodejs'),
      JWT = require('jsonwebtoken');

module.exports = {
  tableName: 'users',
  connection: 'deploy',
  attributes: {
    email: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    salt: {
      type: 'string'
    },
    // key: {
    //   type: 'string'
    // },
    medications: {
      collection: 'medications',
      via: 'owner'
    }
  },
  hashPassword(password, callback) {
    bcrypt.hash(password, null, null, (err, hash) => {
      callback(hash);
    });
  },
  comparePassword(password, hash, callback) {
    bcrypt.compare(password, hash, (err, res) => {
      callback(res);
    });
  },
  generateSalt() {
    return crypto.randomBytes(32).toString('base64');
  },
  generateKey(password, salt, callback) {
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, key) => {
      callback(key);
    });
  },
  signToken(session, callback) {
    JWT.sign(session, process.env.tokenSecret, { algorithm: 'HS256' }, (token) => {
      callback(token);
    });
  }
};
