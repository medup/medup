(function() {
  'use strict';
// app name : starter
//RegisterService dependency is defined in the services.js file
// $ionicPopup dependency for a simple popup
// $state for the transition to the next view
  angular.module('starter.register', [])
    .controller('RegisterCtrl', function($scope, $ionicPopup, $state) {
     $scope.data = {};
     $scope.register = function() {
      RegisterService.RegisterUser($scope.data.username, $scope.data.password).success(function(data) {
       $state.go('state.dashboard'); 
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Register Failed',
          template: 'Please Check your credentials!'
        });
      })
     };
    });
})();