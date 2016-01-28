(function () {
  'use strict';

  angular
      .module('starter.medsForm', ['ionic', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.medId = $stateParams.medName;
    $scope.userMeds = Medications.userMeds;
    $scope.form = {
      name: '',
      dosage: '',
      timeNeeded: '',
      instruction: ''
    };
    $scope.userMeds.localMeds.forEach(function (medication) {
      if (medication.id === parseInt($scope.medId)) {
	$scope.form.name = medication.name;
	$scope.form.dosage = medication.dosage;
	$scope.form.timeNeeded = medication.reminder;
	$scope.form.instruction = medication.instruction;
      }
    });


  };
})();
