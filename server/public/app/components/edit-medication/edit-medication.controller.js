"use strict";

class editMedicationController {
  constructor($scope, editMedicationFactory) {
    this.name = 'editMedication';
    this.scope = $scope;
    this.scope.medication = {
      info: {},
      notifications: []
    };
    this.scope.time = new Date();
    this.scope.ismeridian = true;
    this.scope.timeId = 1;
    this.scope.editTime = this.editTime;
    this.scope.submitMedication = this.submitMedication;
    this.scope.factory = editMedicationFactory;
  }
  submitMedication(medication) {
    this.factory.editMeds(medication)
      .then((res) => {
        console.log('response', res);
      })
      .catch((err) => {
        console.log('Kayla was here', err);
      });
  }
  editTime(time) {
    this.medication.notifications.push(
      {
        id: this.timeId++,
        title: this.medication.info.name,
        text: this.medication.info.instruct,
        at: time.toISOString()
        every: 
      }
    );
  }
}

export default editMedicationController;
