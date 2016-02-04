"use strict";

class viewMedicationController {
  constructor(
  function MedicationsCtrl($scope, $state, MedService) {
    this.scope = $scope;
    this.scope.MedService = MedService;
    this.scope.state = $state;
    this.scope.getData = this.getData;
    this.scope.deleteMeds = this.deleteMeds;
    this.scope.editMeds = this.editMeds;
  }
}

export default viewMedicationController;