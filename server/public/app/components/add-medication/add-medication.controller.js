"use strict";

class addMedicationController {
  constructor($scope, addMedicationFactory) {
    this.name = 'addMedication';
    this.scope = $scope;
    this.scope.medication = {
      notifications: []
    };
    this.scope.times = [
      '8:30am',
      '12:30pm',
      '6:30pm',
      '9:30pm'
    ];
    this.scope.submitMedication = this.submitMedication;
    this.scope.addMedication = addMedicationFactory.addMedication;
  }
  submitMedication(medication) {
    this.addMedication(medication)
      .then((res) => {
        console.log('response', res);
      })
      .catch((err) => {
        console.log('error', err);
      });
  }
}

export default addMedicationController;
