(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('DashboardCtrl', DashboardCtrl);
  DashboardCtrl.$inject = ['$scope', '$state', '$ionicModal', '$timeout', 'MedService', 'Medications'];

  function DashboardCtrl($scope, $state, $ionicModal, $timeout, MedService, Medications) {

    $ionicModal.fromTemplateUrl('app/dashboard/more-information.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    /* Get med data when user enters dashboard */
    var getMedData = function(user) {
      MedService.getMeds(user)
      .then(function(medInfoArr) {
        Medications.userMeds.dbMeds = medInfoArray;
	$scope.medications = Medications.userMeds.dbMeds;
	console.log("fetched medications for %s", user);
      }).catch(function(err) {
        console.error("unable to fetch medication data from server");
	console.dir(err);
      });
    };
 
    getMedData();

    $scope.editMedication = function(medication) {
      $state.go('medsForm', {medName: medication.id});
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
      /**

        TODO:
        - remove reminder from database

       */
    };

    /**
    /* Fake data to test dashboard */
    $scope.medications = [{
      id: 12,
      name: "Abilify (Aripiprazole)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123,
      name: "Actiq (Fentanyl Citrate)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 1234,
      name: "Halcion (Triazolam)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 12345,
      name: "Quinidex (Quinidine)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123456,
      name: "Adderall (Amphetamine)",
      dosage: "10mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }];
  }
})();
