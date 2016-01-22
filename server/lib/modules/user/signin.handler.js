'use strict';
const JWT = require('jsonwebtoken');

const signToken = (session, callback) => {
  JWT.sign(session, process.env.tokenSecret || 'bumblebee', { algorithm: 'HS256' }, (token) => {
    callback(token);
  });
};

module.exports = (request, reply) => {

  let User = request.collections.users;
  let requestUser = request.payload;

  User.findOne({ email: requestUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          User.comparePassword(requestUser.password, user.password, (res) => {
            if (!res) return reply().code(401);

            let session = {
              id: user.id,
              valid: true
            };
            
            signToken(session, (token) => {
              return reply().code(202)
                            .header('Authorization', token);
            });
          });
        } else {
          return reply().code(404);
        }
      });
};
