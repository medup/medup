'use strict';
const JWT = require('jsonwebtoken');

const signToken = (session, callback) => {
  JWT.sign(session, process.env.tokenSecret || 'bumblebee', { algorithm: 'HS256' }, (token) => {
    callback(token);
  });
};

module.exports = (request, reply) => {

  let User = request.collections.users;
  let newUser = request.payload;

  User.findOne({ email: newUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          return reply(user).code(409);
        }

        var salt = User.generateSalt();

        User.hashPassword(newUser.password, hash => {
          User.create({
            email: newUser.email,
            password: hash,
            salt: salt
          }).exec((err, user) => {
            if (err) console.error(err);

            let session = {
              id: user.id,
              valid: true
            };
            
            signToken(session, (token) => {
              return reply().code(201)
                            .header('Authorization', token);
            });
          });
        });
      });
};
