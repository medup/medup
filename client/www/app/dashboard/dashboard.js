(function() {
  'use strict';

  angular.module('starter.dashboard', [])
    .controller('DashboardCtrl', function($scope, $state) {
      // testing for dashboard medications
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


})();
