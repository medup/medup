(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('DashboardCtrl', function($scope, $state, $ionicModal, ionicMaterialInk, ionicMaterialMotion, $timeout) {
      $timeout(function() {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
      }, 0);

      /**
        TODO:
        - If user clicks on the medication it should show more information of that medication
        - For reminder property, it should display the time and daily scheduale the user set
        - Should have navigation at the bottom of app 
       */

      $ionicModal.fromTemplateUrl('app/dashboard/more-information.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });

      $scope.moreInformation = function(medication) {
        $scope.medication = medication;
        $scope.modal.show();
      };

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
})();
