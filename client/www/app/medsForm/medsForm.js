(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('MedsFormCtrl', MedsFormCtrl);
  MedsFormCtrl.$inject = ['$scope', '$state', '$ionicModal', '$timeout', 'MedService'];

  function MedsFormCtrl($scope, $state, $ionicModal, $timeout, MedService) {
  
  }
})();
