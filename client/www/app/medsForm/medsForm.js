(function () {
  'use strict';

  angular
      .module('starter.medsForm', ['ionic', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.medId = $stateParams.medName;
    $scope.userMeds = Medications.userMeds;
    $scope.userMeds.localMeds.forEach(function (medication) {
      if (medication.id === parseInt($scope.medId)) $scope.med = medication;
    });

    $scope.saveMed = function () {
      console.log('save med');
    };
  };
})();
