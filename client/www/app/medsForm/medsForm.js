(function () {
  'use strict';

  angular
      .module('starter.medsForm', ['ionic', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.med = {};
    $scope.medId = $stateParams.medName;
    $scope.userMeds = Medications.userMeds;
    // $scope.userMeds.localMeds.forEach(function (medication) {
    //   if (medication.id === parseInt($scope.medId)) $scope.med = medication;
    // });
    console.log($scope.med);
    $scope.saveMed = function () {
      console.log($scope.med);
      MedService.addMed({info: {name: $scope.med.name, instruct: $scope.med.instruction}})
        .then(function(data) {
          console.dir(data);
	}).catch(function (err) {
          console.error('unable to PUT new medication on server');
	  cosnole.dir(err);
	});
      console.log($scope.medId);
    };

    
  };
})();
