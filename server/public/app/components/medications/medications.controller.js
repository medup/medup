"use strict";

class medicationsController {
  constructor($scope, MedFactory) {
    this.name = 'medications';
    this.scope = $scope;
    this.scope.medications = {};
    this.scope.MedFactory = MedFactory;
    // this.scope.getMedData = this.getMedData;
    this.scope.getMeds = MedFactory.getMeds;
    this.scope.deleteMeds = MedFactory.deleteMeds;
    this.scope.updateMeds = MedFactory.updateMeds;
    this.scope.$on('$viewContentLoaded', function(e) {
      this.scope.medications = this.scope.getMeds();
    }.bind(this));

  }
  

  // getMedData() {
  //   this.MedFactory.getMeds()
  //   .then(medsArray => {
  //    this.medications = MedsArray;
  //   })
  //   .catch(data => {
  //     console.log('error');
  //   });
  // }


}

export default medicationsController;

