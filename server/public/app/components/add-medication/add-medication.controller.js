"use strict";

class addMedicationController {
  constructor($scope, addMedicationFactory) {
    this.name = 'addMedication';
    this.scope = $scope;
    this.scope.addMedicationFactory = addMedicationFactory;
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
  }
  submitMedication(medication) {
    console.log('medication', medication);
    this.addMedicationFactory.addMedication(medication)
      .then((res) => {
        console.log('response', res);
      })
      .catch((err) => {
        console.error('error', err);
      });
  }
}

export default addMedicationController;
