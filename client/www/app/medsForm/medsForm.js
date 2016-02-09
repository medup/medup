(function() {
  'use strict';

  angular
      .module('medup.medsForm', ['ionic', 'ionic-timepicker', 'ionic-material'])
    .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.med = {};
    var id = parseInt($stateParams.medId);
    var drugs = Medications.userMeds.dbMeds;
    drugs.forEach(function(drug) {
      if (drug.id === id) {
        $scope.med = drug;
      }
    });

    $scope.timePickerObject = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
      step: 15,  //Optional
      format: 12,  //Optional
      titleLabel: '12-hour Format',  //Optional
      setLabel: 'Set',  //Optional
      closeLabel: 'Close',  //Optional
      setButtonType: 'button-positive',  //Optional
      closeButtonType: 'button-stable',  //Optional
      callback: function (val) {    //Mandatory
        timePickerCallback(val);
      }
    };

    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }
    
    $scope.getMedData = function() {
      MedService.getMeds()
        .then(function(medInfoArr) {
          Medications.userMeds.dbMeds = medInfoArr;
        }).catch(function(err) {
          console.error("unable to fetch medication data from server");
          console.dir(err);
        });
    };

    $scope.saveMed = function() {
      if ($stateParams.medId) {
        MedService.updateMeds({
            id: $stateParams.medId,
            info: {
              name: $scope.med.info.name,
              instruct: $scope.med.info.instruct
            }
          })
          .then(function(data) {
            console.dir(data);
            $state.go('dashboard');
          }).catch(function(err) {
            console.error('unable to update medication on server');
            console.dir(err);
          });
        console.log($scope.medId);
      } else {
        MedService.addMed({
            info: {
              name: $scope.med.info.name,
              instruct: $scope.med.info.instruct
            }
          })
          .then(function(data) {
            console.dir(data);
            $state.go('dashboard');
          }).catch(function(err) {
            console.error('unable to PUT new medication on server');
            console.dir(err);
          });
        console.log($scope.medId);
      }
    };

  }
})();
