(function() {
  'use strict';
  /**
   * app name : starter
   * AuthService dependency is defined in the services.js file
   * $ionicPopup dependency for a simple popup
   * $state for the transition to the next view
   */
  angular
    .module('starter.auth', [])
    .controller('AuthCtrl', AuthCtrl);
  AuthCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'AuthService'];

  function AuthCtrl($scope, $state, $ionicPopup, AuthService) {
    $scope.data = {};

    $scope.signin = function() {
      AuthService.signin($scope.data)
        .success(function(data) {
          $state.go('state.dashboard');
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Please Check your credentials!'
          });
        });
    };

    $scope.signup = function() {
      RegisterService.signup($scope.data)
        .success(function(data) {
          $state.go('state.dashboard');
        }).error(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Register Failed',
            template: 'Please Check your credentials!'
          });
        });
    };
  }
})();