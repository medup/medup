'use strict';

module.exports = {
  tableName: 'logs',
  connection: 'deploy',
  attributes: {
    created: 'date',
    painInput: 'string',
    overallHealth: 'string',
    fatigueInput: 'string',
    sideEffects: 'json',
    owner: {
      model: 'users'
    }
  }
}
