(function() {
  'use strict';

  angular
      .module('medup.medsForm', ['ionic', 'ionic-timepicker', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl)
      .directive('StandardTimeMeridian', StandardTimeMeridian);

  MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService', 'Medications'];
  StandardTimeMeridian.$inject = [];

  function StandardTimeMeridian() {
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        etime: '=etime'
      },
      template: "<strong>{{stime}}</strong>",
      link: function(scope, elem, attrs) {

        scope.stime = epochParser(scope.etime, 'time');

        function prependZero(param) {
          if (String(param).length < 2) {
            return "0" + String(param);
          }
          return param;
        }

        function epochParser(val, opType) {
          if (val === null) {
            return "00:00";
          } else {
            var meridian = ['AM', 'PM'];

            if (opType === 'time') {
              var hours = parseInt(val / 3600);
              var minutes = (val / 60) % 60;
              var hoursRes = hours > 12 ? (hours - 12) : hours;

              var currentMeridian = meridian[parseInt(hours / 12)];

              return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
            }
          }
        }

        scope.$watch('etime', function(newValue, oldValue) {
          scope.stime = epochParser(scope.etime, 'time');
        });

      }
    };
  };
  
  function MedsFormCtrl($scope, $state, $stateParams, MedService, Medications) {
    $scope.med = {};
    var id = parseInt($stateParams.medId);
    var drugs = Medications.userMeds.dbMeds;
    drugs.forEach(function(drug) {
      if (drug.id === id) {
        $scope.med = drug;
      }
    });
    console.dir(drugs);
    
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

    var rightNow = new Date();
    $scope.displayTime = twelveTime(rightNow.getUTCHours(), 30);
    
    function twelveTime(hours, minutes) {
      var meridian = 'AM';
      if (hours > 11) meridian = 'PM'

      return (hours % 12) + ':' + minutes + ' ' + meridian;
    };
    
    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
	$scope.timePickerObject.inputEpochTime = val;
	$scope.displayTime = twelveTime(selectedTime.getUTCHours(), selectedTime.getUTCMinutes());
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
      var note = [{
            title: 'Take ' + $scope.med.info.dose + $scope.med.info.unit + ' of ' + $scope.med.info.name + ' now.',
	    text: $scope.med.info.instruct,
	    at: new Date($scope.timePickerObject.inputEpochTime),
	    every: 'day'
          }],
	  pill = {
            info: {
              name: $scope.med.info.name,
	      dose: $scope.med.info.dosage,
              instruct: $scope.med.info.instruct
            }
          };
      if(!$scope.med.notifications) pill.notifications = note;
        else pill.notifications = $scope.med.notifications.concat(note);
      
      if ($stateParams.medId) {
	pill.id = $stateParams.medId,
        MedService.updateMeds(pill)
          .then(function(data) {
            console.dir(data);
            $state.go('dashboard');
          }).catch(function(err) {
            console.error('unable to update medication on server');
            console.dir(err);
          });
      } else {
        MedService.addMed(pill)
          .then(function(data) {
            console.dir(data);
            $state.go('dashboard');
          }).catch(function(err) {
            console.error('unable to PUT new medication on server');
            console.dir(err);
          });
      }
    };

  }
})();
