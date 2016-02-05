"use strict";

class medicationsController {
  constructor($scope, $state, MedFactory) {
    this.name = 'medications';
    this.scope = $scope;
    this.scope.getMeds = MedFactory.getMeds;
    this.scope.deleteMeds = MedFactory.deleteMeds;
    this.scope.updateMeds = MedFactory.updateMeds;
  }
  getMeds() {
    MedFactory.getMeds
  }


}

export default medicationsController;

