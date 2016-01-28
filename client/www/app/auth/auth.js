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
        .then(function(data) {
          $state.go('dashboard');
        }).catch(function(data) {
          console.log(data);
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Please Check your credentials!'
          });
        });
    };

    $scope.signup = function() {
      console.log("Signup - Scope data " + $scope.data);
     AuthService.signup($scope.data)
        .then(function(data) {
          $state.go('dashboard');
        }).catch(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Register Failed',
            template: 'Please Check your credentials!'
          });
        });
    };
  }
})();