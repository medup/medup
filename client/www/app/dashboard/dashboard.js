(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('DashboardCtrl', function($scope, $state, $ionicModal, ionicMaterialInk, ionicMaterialMotion, $timeout) {
      $timeout(function() {
        ionicMaterialInk.displayEffect();
        ionicMaterialMotion.ripple();
      }, 0);

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
        instruction: "Take one tablet by mouth every morning",
        reminder: "10:30AM Every Day",
        image: "http://i63.tinypic.com/289wqk5.png"
      }, {
        name: "Actiq (Fentanyl Citrate)",
        dosage: "5mg",
        instruction: "Take one tablet by mouth every morning",
        reminder: "10:30AM Every Day",
        image: "http://i63.tinypic.com/289wqk5.png"
      }, {
        name: "Halcion (Triazolam)",
        dosage: "5mg",
        instruction: "Take one tablet by mouth every morning",
        reminder: "10:30AM Every Day",
        image: "http://i68.tinypic.com/o7nlab.png"
      }, {
        name: "Quinidex (Quinidine)",
        dosage: "5mg",
        instruction: "Take one tablet by mouth every morning",
        reminder: "10:30AM Every Day",
        image: "http://i63.tinypic.com/289wqk5.png"
      }];

    });
})();
