'use strict';
const crypto = require('crypto'),
      bcrypt = require('bcrypt-nodejs');

module.exports = {
  tableName: 'users',
  connection: 'local',
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
    crypto.pbkdf2(password, salt, 10000, 512, 'sha512', (err, key) => {
      callback(key);
    });
  }
};