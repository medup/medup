(function () {
  'use strict';

  angular
      .module('starter.medsForm', ['ionic', 'ionic-material'])
      .controller('MedsFormCtrl', MedsFormCtrl);
      MedsFormCtrl.$inject = ['$scope', '$state', '$stateParams', 'MedService'];

  function MedsFormCtrl($scope, $state, $stateParams, MedService) {
    $scope.medId = $stateParams.medName;
    console.log($scope.medId);
  };
})();
