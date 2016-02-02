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
    $scope.user = {};

    $scope.signin = function() {
      AuthService.signin($scope.user)
        .then(function(data) {
          $state.go('dashboard', {user: $scope.data.email});
        }).catch(function(data) {
          console.log(data);
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Please Check your credentials!'
          });
        });
    };

    $scope.signup = function() {
      AuthService.signup($scope.user)
        .then(function(data) {
          $state.go('dashboard');
        }).catch(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Register Failed',
            template: 'Please Check your credentials!'
          });
        });
    };

    $scope.goToSignUp = function() {
      $state.go('signup');
    };

    $scope.goToSignIn = function() {
      $state.go('signin');
    };
  }
})();
