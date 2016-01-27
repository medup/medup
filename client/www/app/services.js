/**
 *
 * Handles requests made to server via $http
 *
 */

(function() {
  'use strict';

  angular
    .module('starter.services', [])
    .service('AuthService', AuthService)
    .service('MedService', MedService)
    .factory('Medications', MedService);
   
  AuthService.$inject = ['$window', '$state', '$http'];
  MedService.$inject = ['$state', '$http'];

  function AuthService($window, $state, $http) {
    this.hasToken = function() {
      return !!$window.localStorage.getItem('com.pillMeNow');
    };

    this.signin = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3003/users/signin',
          data: user
        })
        .then(function(response) {
          return response.data.token;
        });
    };

    this.signup = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3003/users/signup',
          data: user
        })
        .then(function(response) {
          return response.data.token;
        });
    };

    this.signout = function() {
      $window.localStorage.removeItem('com.pillMeNow');
      $state.go('/signin');
    };
  }

  function MedService($state, $http) {
    this.getMeds = function(user) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3003/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };

    this.updateMeds = function(user) {
      return $http({
          method: 'PUT',
          url: 'http://localhost:3003/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };

    this.deleteMeds = function(user) {
      return $http({
          method: 'DELETE',
          url: 'http://localhost:3003/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };
  }

  function Medications() {
    var  medFac = {};
    MedService.getMeds(user)
      .success(function(medInfoArr) {
        medFac.userMeds.medArray = medInfoArray;
      }).error(function(medInfoArr) {
        console.log("ERROR: User Medications not Received");
      });
    return medFac;
  };
  
})();
