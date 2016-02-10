"use strict";

let moment = require('moment');

class editMedicationController {
  constructor($scope, MedFactory, $state) {
    this.name = 'editMedication';
    this.scope = $scope;
    this.scope.medication = MedFactory.medData;
    console.log("printing from edit med controller");
    console.log(this.scope.medication);
    this.scope.form = {};
    this.scope.display = [];
    this.scope.time = new Date();
    this.scope.ismeridian = true;
    this.scope.editTime = this.editTime;
    this.scope.submitMedication = this.submitMedication;
    this.scope.factory = MedFactory;
  }
  submitMedication(medication) {
    this.factory.editMed(medication)
      .then((res) => {
        console.log('Medication Edited', res);
        console.log(res);
      })
      .catch((err) => {
        console.log('Edit Medication ERROR', err);
      });
  }
  editTime(time) {
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

export default editMedicationController;
