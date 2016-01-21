'use strict';

module.exports = {

  tableName: 'users',
  connection: 'memory',
  attributes: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  }
};