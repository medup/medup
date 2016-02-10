'use strict';

const internals = {};

internals.getLog = (request, reply) => {

  let User = request.collections.users;
  let userId = request.auth.credentials.id;

  User.findOne({ id: userId })
      .populate('logs')
      .exec((err, user) => {
        if (err) throw err;

        if (!user) {
          return reply('User not found').code(404);
        }

        if (user) {
          return reply(user.logs);
        }
      });
};

internals.addLog = (request, reply) => {

  let Logs = request.collections.logs;
  let log = request.payload;

  Logs.create({
    created: new Date().now,
    painInput: log.painInput,
    overallHealth: log.overallHealth,
    fatigueInput: log.fatigueInput,
    sideEffects: log.sideEffects,
    owner: request.auth.credentials.id
  }).exec((err, log) => {
    if (err) throw err;

    return reply('Log added').code(201);
  });
};

module.exports = internals;
