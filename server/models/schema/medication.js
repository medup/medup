'use strict';

module.exports = {
  tableName: 'medications',
  connection: 'deploy',
  attributes: {
    info: 'string',
    taken: 'array',
    notifications: 'array',
    owner: {
      model: 'users'
    }
  }
};
