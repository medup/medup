'use strict';

module.exports = {
  tableName: 'medications',
  connection: 'local',
  attributes: {
    info: 'string',
    taken: 'array',
    owner: {
      model: 'users'
    }
  }
};
