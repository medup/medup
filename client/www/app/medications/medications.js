(function() {
  'use strict';

  angular
    .module('medup.medications', ['ionic', 'ionic-material'])
    .controller('MedicationsCtrl', MedicationsCtrl);
  MedicationsCtrl.$inject = ['$scope', '$state', '$stateParams', '$timeout', 'MedService', 'Medications'];

  function MedicationsCtrl($scope, $state, $stateParams, $timeout, MedService, Medications) {
    /* Get med data when user enters dashboard */
    var getMedData = function() {
      MedService.getMeds()
        .then(function(medInfoArr) {
          $scope.medications = medInfoArr;
          Medications.userMeds.dbMeds = medInfoArr;
        }).catch(function(err) {
          console.error("unable to fetch medication data from server");
          console.dir(err);
        });
    };

    $scope.$on('$viewContentLoaded', function(event) {
      getMedData();
    });

    $scope.getMeds = function() {
      console.log('get meds!');
    };
    $scope.medications = {};
    getMedData();
    /*----------  Fake Medication Data  ----------*/
    // $scope.medications = {
    //   info: [{
    //     image: "../img/pill.png",
    //     name: "Lisinopril",
    //     dosage: "15mg",
    //     remaining: 25,
    //     date: "2015-07-28T04:33:01.852z",
    //     instruct: "BY MOUTH / WITH FOOD"
    //   }, {
    //     image: "../img/pill.png",
    //     name: "Lisinopril",
    //     dosage: "15mg",
    //     remaining: 25,
    //     date: "2015-07-28T04:33:01.852z",
    //     instruct: "BY MOUTH / WITH FOOD"
    //   }, {
    //     image: "../img/pill.png",
    //     name: "Lisinopril",
    //     dosage: "15mg",
    //     remaining: 25,
    //     date: "2015-07-28T04:33:01.852z",
    //     instruct: "BY MOUTH / WITH FOOD"
    //   }, {
    //     image: "../img/pill.png",
    //     name: "Lisinopril",
    //     dosage: "15mg",
    //     remaining: 25,
    //     date: "2015-07-28T04:33:01.852z",
    //     instruct: "BY MOUTH / WITH FOOD"
    //   }]
    // };

    $scope.editMedication = function(medication) {
      $state.go('medsForm', {
        medId: medication.id
      });
    };
    /**

      TODO:
      - route to medsForm state passing in the information for placeholder
      - should update the database when information is edited and reflect on dashboard
      - should route to dashboard when editing is complete
      - should be able to add multiple alarms on medForm for that medication

     */

    //};

    $scope.moreInformation = function(e, medication) {
      $scope.medication = medication;
      $scope.modal.show();
    };

    $scope.removeReminder = function(medication) {
      MedService.deleteMeds(medication.id)
        .then(function(data) {
          console.info(data);
          $scope.medications = {};
          getMedData();
        }).catch(function(err) {
          console.error(err);
        });
    };
  }

})();
