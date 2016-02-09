'use strict';

const internals = {};

internals.signup = (request, reply) => {
  
  let User = request.collections.users;
  let newUser = request.payload;

  User.findOne({ email: newUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          return reply('User already exists').code(409);
        }

        let salt = User.generateSalt();

        User.hashPassword(newUser.password, hash => {
          User.create({
            email: newUser.email,
            password: hash,
            salt: salt
          }).exec((err, user) => {
            if (err) console.error(err);

            // User.generateKey(newUser.password, user.salt, key => {

              let session = {
                id: user.id,
                valid: true
              };

              User.signToken(session, (token) => {
                return reply({ token: token }).code(201);
              });
            // });
          });
        });
      });
};

internals.signin = (request, reply) => {
  let User = request.collections.users;
  let requestUser = request.payload;

  User.findOne({ email: requestUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          User.comparePassword(requestUser.password, user.password, (res) => {
            if (!res) return reply('Invalid password').code(401);

            // User.generateKey(requestUser.password, user.salt, key => {

              let session = {
                id: user.id,
                valid: true
              };

              User.signToken(session, (token) => {
                return reply({ token: token }).code(200);
              });
            // });
          });
        } else {
          return reply().code(404);
        }
      });
};

module.exports = {
  signup: internals.signup,
  signin: internals.signin
};