'use strict';

module.exports = {
  tableName: 'medications',
  connection: 'deploy',
  attributes: {
    info: 'string',
    taken: 'array',
    owner: {
      model: 'users'
    }
  }
};