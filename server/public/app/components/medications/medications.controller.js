"use strict";

class medicationsController {
  constructor($scope, MedFactory) {
    this.name = 'medications';
    this.scope = $scope;
    this.scope.medications = [];
    this.scope.MedFactory = MedFactory;
    this.scope.getMeds = MedFactory.getMeds;
    this.scope.apply = $scope.$apply;
    this.scope.deleteMeds = MedFactory.deleteMeds;
    this.scope.deleteItem = this.deleteItem;
    this.scope.editMeds = MedFactory.updateMeds;
    this.scope.$on('$viewContentLoaded', function(e) {
      this.scope.getMeds()
      .then(medsArray => {
        this.scope.medications = medsArray;
      })
      console.log(this.scope.medications);
      console.log("testing");
    }.bind(this));
  }

  deleteItem(id, index) {
   this.MedFactory.deleteMeds(id)
   .then(data => {
    console.log(id);
     this.medications.splice(index, 1);
   })
   .catch(data => {
     console.log("error");
   });
  }
  
}

export default medicationsController;

