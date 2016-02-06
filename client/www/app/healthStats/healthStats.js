(function() {
  'use strict';

  angular
    .module('medup.healthStats', ['ionic', 'ionic-material', 'nvd3'])
    .controller('HealthStatsCtrl', HealthStatsCtrl);
  HealthStatsCtrl.$inject = ['$scope', '$state'];

  function HealthStatsCtrl($scope, $state) {
    /*----------  Fake Adderall Side Effects ----------*/
    $scope.adderallLabels = ["Dry Mouth", "Stomach Pain", "Dizziness", "Trouble Sleeping"];
    $scope.adderall = [
      [10, 9, 10, 7]
    ];

    /*----------  Fake Synthroid Side Effects ----------*/
    $scope.synthroidLabels = ["fever", "Stomach Pain", "Dizziness", "Trouble Sleeping"];
    $scope.synthroid = [
      [1, 6, 1, 8]
    ];

    /*----------  Fake Compliance Data ----------*/
    $scope.complianceLabels = ["Missed", "Taken"];
    $scope.compliance = [1, 3];
    $scope.colors = ['#FD1F5E','#1EF9A1'];
  }

})();
