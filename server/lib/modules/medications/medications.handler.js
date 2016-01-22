'use strict'

let handle = {
  'get': (request, reply) => {
    let Medications = request.collections.medications;

    Medications.findOne()
      .exec(function(err, medications) {
        if (err) console.error(err);

        if (medications) {
          return reply(medications).code(200);
        }

        return reply.code(404);

      });
  },
  'post': (request, reply) => {
    let Medications = request.collections.medications;
    let list = request.payload;
    console.log('Medications', Medications);

    Medications.create({
      list: list
    }).exec(function(err, meds) {
      if (err) console.error(err);

      return reply(meds).code(201);
    });
  }
};

module.exports = (request, reply) => {
  handle[request.method](request, reply);
};
