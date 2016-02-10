"use strict";

let moment = require('moment');

class addMedicationController {
  constructor($scope, addMedicationFactory, $state) {
    this.name = 'addMedication';
    this.scope = $scope;
    this.scope.form = {};
    this.scope.medication = {
      info: {},
      notifications: []
    };
    this.scope.display = [];
    this.scope.time = new Date();
    this.scope.ismeridian = true;
    this.scope.addTime = this.addTime;
    this.scope.submitMedication = this.submitMedication;
    this.scope.factory = addMedicationFactory;
  }
  submitMedication(medication) {
    this.factory.addMedication(medication)
      .then((res) => {
        console.log('response', res);
        this.medication = {
          info: {},
          notifications: []
        };
        this.display = [];
      })
      .catch((err) => {
        console.log('Submit Medication ERROR', err);
      });
  }
  addTime(time) {
    this.medication.notifications.push(
      {
        title: this.medication.info.name,
        text: this.medication.info.instruct,
        at: time.toISOString(),
        every: 'day'
      }
    );
    this.display.push(moment().to(time.toISOString()));
    this.time = new Date();
  }
}

export default addMedicationController;
