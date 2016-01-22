'use strict'

let handle = {
  'get': (request, reply) => {
    let User = request.collections.users;

    User.findOne({id: request.auth.credentials.id})
        .populate('medications')
        .exec(function(err, found) {
          if (err) console.error(err);

          if (found) {
            return reply(found).code(200);
          }

          return reply().code(404);

        });
  },
  'post': (request, reply) => {
    let Medications = request.collections.medications;
    let medication = request.payload;

    Medications.create({
      info: medication.info,
      owner: request.auth.credentials.id
    }).exec(function(err, med) {
      if (err) console.error(err);

      return reply(med).code(201);
    });
   }
};

module.exports = (request, reply) => {
  handle[request.method](request, reply);
};
