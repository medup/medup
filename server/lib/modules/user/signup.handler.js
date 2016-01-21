'use strict';

module.exports = (request, reply) => {

  let User = request.collections.users;
  let newUser = request.payload;

  User.findOne({ email: newUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          return reply(user).code(409);
        }

        User.create({
          email: newUser.email
        }).exec(function(err, user) {
          if (err) console.error(err);      
          return reply(user).code(201);
        });
      });
};