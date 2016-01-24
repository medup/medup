'use strict';

const CryptoJS = require('crypto-js');

let handle = {
  'get': (request, reply) => {
    let User = request.collections.users,
        userId = request.auth.credentials.id;

    User.findOne({ id: userId })
        .populate('medications')
        .exec(function(err, user) {
          if (err) console.error(err);

          if (user) {
            let data = user.medications.map(med => {
              let decryptedText = CryptoJS.AES.decrypt(med.info.toString(), process.env.keySecret);

              return {
                id: med.id,
                owner: med.owner,
                info: JSON.parse(decryptedText.toString(CryptoJS.enc.Utf8))
              };
            });

            return reply(data).code(200);
          }

          return reply().code(404);
        });
  },
  'post': (request, reply) => {
    let Medications = request.collections.medications;
    let medication = request.payload;

    let encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(medication.info), process.env.keySecret);

    Medications.create({
      info: encryptedInfo.toString(),
      owner: request.auth.credentials.id
    }).exec(function(err, med) {
      if (err) console.error(err);

      return reply(med).code(201);
    });
  },
  'put': (request, reply) => {

    let Medications = request.collections.medications;
    let medication = request.payload;
    let medicationId = request.params.id;

    Medications.findOne({id: medicationId})
      .exec((err, med) => {

        if (err) console.error(err);

        if (medication.taken) {
          med.taken = medication.taken;
          med.save((err, saved) => {

            if (err) console.error(err);

            if (saved) {
              return reply().code(200);
            }

            return reply().code(404);

          });
      } else {

        let encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(medication.info), process.env.keySecret);

        med.info = encryptedInfo.toString();
        med.save((err, saved) => {

          if (err) console.error(err);

          if (saved) {
            return reply().code(200);
          }

          return reply().code(404);

        });
      }
    });
  },
  'delete': (request, reply) => {
    
    let Medications = request.collections.medications;
    let medId = request.params.id;

    Medications.destroy({id: medId}).exec((err) => {

      if (err) {
        console.error(err);
        reply.code(404);
      }

      reply().code(200);

    });
  }

};

module.exports = (request, reply) => {
  handle[request.method](request, reply);
};
