'use strict';

module.exports = {
  tableName: 'medications',
  connection: 'local',
  attributes: {
    info: 'json',
    taken: 'array',
    owner: {
      model: 'users'
    }
  }
};
