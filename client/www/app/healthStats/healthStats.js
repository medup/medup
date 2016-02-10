(function() {
  'use strict';

  angular
    .module('medup.healthStats', ['ionic', 'ionic-material', 'nvd3'])
    .controller('HealthStatsCtrl', HealthStatsCtrl);
  HealthStatsCtrl.$inject = ['$scope', '$state'];

  function HealthStatsCtrl($scope, $state) {

    /*----------  Fake Compliance Data ----------*/
    $scope.complianceLabels = ["Missed", "Taken"];
    $scope.compliance = [1, 3]; // [missedNum, takenNum]
    $scope.complianceColors = ['#FD1F5E', '#1EF9A1'];

    /*----------  All Side Effects ----------*/
    $scope.allSideEffectsLabels = ["Fever", "Stomach Pain", "Dizziness", "Trouble Sleeping"];
    $scope.allSideEffects = [
      [1, 1, 2, 10] // increment based on how many days it occurs
    ];

    /*----------  Weekly Side Effects ----------*/
    $scope.weeklySideEffectsLabels = ["Fever", "Stomach Pain", "Dizziness", "Trouble Sleeping"];
    $scope.weeklySideEffects = [
      [1, 6, 1, 8] // amount of times sideeffects occured weekly
    ];

    /*----------  Pain and Fatigue Scales  ----------*/
    $scope.scalesLabels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    $scope.series = ['Pain', 'Fatigue'];
    $scope.scalesColors = ['#FD1F5E', '#F39611'];
    $scope.scales = [
      [10, 20, 80, 81, 30, 55, 80], // pain array values
      [28, 48, 40, 19, 86, 27, 90] // fatigue array values
    ];
    $scope.onClick = function(points, evt) {
      console.log(points, evt);
    };

  }

})();
