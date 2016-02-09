"use strict";

class addMedicationController {
  constructor($scope, addMedicationFactory) {
    this.name = 'addMedication';
    this.scope = $scope;
    this.scope.medication = {
      info: {},
      notifications: []
    };
    this.scope.time1 = new Date();
    this.scope.time2 = new Date();
    this.scope.time3 = new Date();
    this.scope.time4 = new Date();
    this.scope.ismeridian = true;
    this.scope.timeId = 1;
    this.scope.addTime = this.addTime;
    this.scope.submitMedication = this.submitMedication;
    this.scope.factory = addMedicationFactory;
  }
  submitMedication(medication) {
    this.factory.addMedication(medication)
      .then((res) => {
        console.log('response', res);
      })
      .catch((err) => {
        console.log('Kayla was here', err);
      });
  }
  addTime(time) {
    this.medication.notifications.push(
      {
        id: this.timeId++,
        title: this.medication.info.name,
        text: this.medication.info.instruct,
        at: time.toISOString()
      }
    );
  }
}

export default addMedicationController;
