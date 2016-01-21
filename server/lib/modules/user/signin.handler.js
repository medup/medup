'use strict';

module.exports = (request, reply) => {

  let User = request.collections.users;
  let existingUser = request.payload;

  User.findOne({ email: existingUser.email })
      .exec(function(err, user) {
        if (err) console.error(err, '12');

        if (user) {
          return reply().code(202);
        }

        return reply().code(404);

      });
};
