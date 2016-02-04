(function() {
  'use strict';
  
  angular
    .module('medup.auth', [])
    .controller('AuthCtrl', AuthCtrl);
  AuthCtrl.$inject = ['$scope', '$state', '$ionicPopup', 'AuthService'];

  function AuthCtrl($scope, $state, $ionicPopup, AuthService) {
    $scope.user = {};

    $scope.signin = function() {
      AuthService.signin($scope.user)
        .then(function(data) {
          $state.go('dashboard', {
            user: $scope.data.email
          });
        }).catch(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Please Check your credentials!'
          });
        });
    };

    $scope.register = function() {
      AuthService.register($scope.user)
        .then(function(data) {
          $state.go('dashboard', {
            user: $scope.user.email
          });
        }).catch(function(data) {
          var alertPopup = $ionicPopup.alert({
            title: 'Register Failed',
            template: 'Please Check your credentials!'
          });
        });
    };
  }
})();
