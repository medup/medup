(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$scope', '$state', '$stateParams', '$ionicModal', '$timeout', 'MedService', 'Medications'];

  function DashboardCtrl($scope, $state, $stateParams, $ionicModal, $timeout, MedService, Medications) {

    $ionicModal.fromTemplateUrl('app/dashboard/more-information.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    /* Get med data when user enters dashboard */
    var getMedData = function() {
      MedService.getMeds()
      .then(function(medInfoArr) {
        console.dir(medInfoArr);	    
        $scope.medications = medInfoArr;
	Medications.userMeds.dbMeds = medInfoArr;
      }).catch(function(err) {
        console.error("unable to fetch medication data from server");
	console.dir(err);
      });
    };

    $scope.medications = {};
    getMedData();
        
    $scope.editMedication = function(medication) {
      $state.go('medsForm', {medId: medication.id});
      /**

        TODO:
        - route to medsForm state passing in the information for placeholder
        - should update the database when information is edited and reflect on dashboard
        - should route to dashboard when editing is complete
        - should be able to add multiple alarms on medForm for that medication

       */

    };

    $scope.moreInformation = function(e, medication) {
      $scope.medication = medication;
      $scope.modal.show();
    };

    $scope.removeReminder = function(medication) {
      var index = $scope.medications.indexOf(medication);
      $scope.medications.splice(index, 1);
    };
  }
})();
