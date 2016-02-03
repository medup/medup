(function() {
  'use strict';

  angular
    .module('starter.healthStats', ['ionic', 'ionic-material', 'nvd3'])
    .controller('HealthStatsCtrl', HealthStatsCtrl);
  HealthStatsCtrl.$inject = ['$scope', '$state'];

  function HealthStatsCtrl($scope, $state) {
    /*----------  Adderall Fake Data ----------*/
    $scope.labels = ["Dry Mouth", "Stomach Pain", "Dizziness", "Trouble Sleeping"];

    $scope.data = [
      [65, 59, 90, 81],
      [28, 48, 40, 19]
    ];

    /*----------  Compliance Fake Data  ----------*/

    // $scope.labels = ["Taken", "Missed"];
    // $scope.data = [300, 500, 100, 40, 120];
  }
})();
