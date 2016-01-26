(function() {
  'use strict';
// app name : starter
//LoginService dependency is defined in the services.js file
// $ionicPopup dependency for a simple popup
// $state for the transition to the next view
  angular.module('starter.login', [])
    .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
     $scope.data = {};
     $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
       $state.go('state.dashboard'); 
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Please Check your credentials!'
        });
      })
     };
    });
})();