'use strict';

module.exports = {
  tableName: 'medications',
  connection: 'local',
  attributes: {
    name: 'string',
    instruct: 'string',
    owner: {
      model: 'users'
    }
  }
};
