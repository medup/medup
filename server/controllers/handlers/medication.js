'use strict';

const CryptoJS = require('crypto-js');
const Shortid = require('shortid');

let internals = {
  'get': (request, reply) => {

    let User = request.collections.users;
    let userId = request.auth.credentials.id;

    User.findOne({ id: userId })
        .populate('medications')
        .exec((err, user) => {
          if (err) console.error(err);

          if (!user) return reply('User not found').code(404);

          if (user) {
            let data = user.medications.map(med => {
              let decryptedText = CryptoJS.AES.decrypt(med.info.toString(), process.env.keySecret);

              return {
                id: med.id,
                notifications: med.notifications,
                owner: med.owner,
                info: JSON.parse(decryptedText.toString(CryptoJS.enc.Utf8))
              };
            });

            return reply(data);
          }

          return reply([]);
        });
  },
  'post': (request, reply) => {

    let Medications = request.collections.medications;
    let medication = request.payload;

    let encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(medication.info), process.env.keySecret);

    Medications.create({
      info: encryptedInfo.toString(),
      notifications: Array.isArray(medication.notifications) ? medication.notifications.map(notification => {
        return {
          id: Shortid.generate(),
          title: notification.title,
          text: notification.text,
          at: notification.at,
          every: notification.every
        }
      }) : [],
      taken: [],
      owner: request.auth.credentials.id
    }).exec(function(err, med) {
      if (err) console.error(err);

      return reply('Medication added').code(201);
    });
  },
  'put': (request, reply) => {

    let Medications = request.collections.medications;
    let medication = request.payload;
    let medicationId = request.params.id;

    Medications.findOne({id: medicationId})
      .exec((err, med) => {

        if (err) console.error(err);

        if (med.owner !== request.auth.credentials.id) {
          return reply().code(401);
        }

        if (medication.taken) {
          med.taken.push(new Date().now);
          med.save((err, saved) => {

            if (err) console.error(err);

            if (saved) {
              return reply();
            }

            return reply().code(404);

          });
        } else {

          let encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(medication.info), process.env.keySecret);

          med.info = encryptedInfo.toString();
          med.notifications = medication.notifications || [];
          med.save((err, saved) => {

            if (err) console.error(err);

            if (saved) {
              return reply();
            }

            return reply().code(404);

          });
        }
    });
  },
  'delete': (request, reply) => {

    let Medications = request.collections.medications;
    let medId = request.params.id;

    Medications.findOne({id: medId})
      .exec((err, med) => {

        if (err) console.error(err);

        if (med.owner !== request.auth.credentials.id) {
          return reply().code(401);
        }

        Medications.destroy({id: medId}).exec((err) => {

          if (err) {
            console.error(err);
            return reply().code(404);
          }

          return reply();

        });
      });
    }
};

module.exports = (request, reply) => {
  internals[request.method](request, reply);
};
