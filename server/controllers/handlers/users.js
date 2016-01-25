'use strict';

const internals = {};

internals.signup = (request, reply) => {
    let User = request.collections.users;
  let newUser = request.payload;

  User.findOne({ email: newUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          return reply(user).code(409);
        }

        User.hashPassword(newUser.password, hash => {
          User.create({
            email: newUser.email,
            password: hash
          }).exec((err, user) => {
            if (err) console.error(err);

            let session = {
              id: user.id,
              valid: true
            };
            
            User.signToken(session, (token) => {
              return reply().code(201)
                            .header('Authorization', token);
            });
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
            if (!res) return reply().code(401);

            let session = {
              id: user.id,
              valid: true
            };

            User.signToken(session, (token) => {
              return reply().code(200)
                      .header('Authorization', token);
            });
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