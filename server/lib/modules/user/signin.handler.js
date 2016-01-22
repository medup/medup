'use strict';

let getMeds = (User, id) => {
  User.findOne({id: id}).populate('medications')
    .exec(function(err, found) {
      if (err) console.error(err);
      return found;
    });
};

module.exports = (request, reply) => {

  let User = request.collections.users;
  let requestUser = request.payload;
  let medications;

  User.findOne({ email: requestUser.email })
      .exec(function(err, user) {
        if (err) console.error(err);

        if (user) {
          User.comparePassword(requestUser.password, user.password, (res) => {
            if (!res) return reply().code(401);

            medications = getMeds(User, request.auth.credentials.id);

            let session = {
              id: user.id,
              valid: true
            };

            User.signToken(session, (token) => {
              return reply().code(202)
                            .header('Authorization', token);
            });
          });
        } else {
          return reply().code(404);
        }
      });
};
