(function () {
  'use strict';

  angular
      .module('starter.medsForm', ['ionic', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.med = {};
    var id = parseInt($stateParams.medId);
    var drugs = Medications.userMeds.dbMeds;
    console.dir(drugs);
    console.log('param: %s', id);
    drugs.forEach(function (drug) {
      if (drug.id === id) {
	$scope.med = drug;
      }
    });

    $scope.getMedData = function () {
      MedService.getMeds()
        .then(function(medInfoArr) {
          Medications.userMeds.dbMeds = medInfoArr;
        }).catch(function(err) {
          console.error("unable to fetch medication data from server");
          console.dir(err);
        });
    };
    
    $scope.saveMed = function () {
      if ($stateParams.medId) {
        MedService.updateMeds({id: $stateParams.medId,
			       info: {name: $scope.med.info.name, instruct: $scope.med.info.instruct}
			      })
        .then(function(data) {
          console.dir(data);
	}).catch(function (err) {
          console.error('unable to update medication on server');
	  console.dir(err);
	});
        console.log($scope.medId);
      } else {	
        MedService.addMed({info: {name: $scope.med.info.name, instruct: $scope.med.info.instruct}})
          .then(function(data) {
            console.dir(data);
	  }).catch(function (err) {
            console.error('unable to PUT new medication on server');
	    console.dir(err);
	  });
	console.log($scope.medId);
      }	
    };

  };
})();
