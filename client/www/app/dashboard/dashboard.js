(function() {
  'use strict';

  angular
    .module('starter.dashboard', [])
    .controller('DashboardCtrl', function($scope, $state) {

      /* Fake data to test dashboard */
      $scope.medications = [{
        name: "Abilify (Aripiprazole)",
        dosage: "5mg",
        reminder: "10:30AM Every Day"
      }, {
        name: "Actiq (Fentanyl Citrate)",
        dosage: "5mg",
        reminder: "10:30AM Every Day"
      }, {
        name: "Halcion (Triazolam)",
        dosage: "5mg",
        reminder: "10:30AM Every Day"
      }, {
        name: "Quinidex (Quinidine)",
        dosage: "5mg",
        reminder: "10:30AM Every Day"
      }];
    });
    /**
    
      TODO:
      - If user click on the medication it should show more information of that medication
      - Second todo item
    
     */
    

})();
