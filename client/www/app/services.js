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
    .service('MedService', MedService);

  AuthService.$inject = ['$window', '$state', '$http'];
  MedService.$inject = ['$state', '$http'];

  function AuthService($window, $state, $http) {
    this.hasToken = function() {
      return !!$window.localStorage.getItem('com.pillMeNow');
    };

    this.signin = function(user) {
      var headers = {
        'Access-Control-Allow-Origin' : '*',
      };
      return $http({
          method: 'POST',
          headers: headers,
          url: 'http://localhost:3003/users/signin',
          data: user
        })
        .then(function(response) {
          var token = response.data.token;
          console.log(response);
          $window.localStorage.setItem('com.pillMeNow');
        });
    };

    this.signup = function(user) {
      var headers = {
        'Access-Control-Allow-Origin' : '*',
      };
      return $http({
          method: 'POST',
          headers: headers,
          url: 'http://localhost:3003/users/signup',
          data: user
        })
        .then(function(response) {
          var token = response.data.token;
          console.log(response);
          $window.localStorage.setItem('com.pillMeNow', token);
        
        });
    };

    this.signout = function() {
      $window.localStorage.removeItem('com.pillMeNow');
      $state.go('/signin');
    };
  }

  function MedService($state, $http) {
    this.getMeds = function(user) {
      var headers = {
        'Access-Control-Allow-Origin' : '*',
      };
      return $http({
          method: 'GET',
          headers: headers,
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
      var headers = {
        'Access-Control-Allow-Origin' : '*',
      };
      return $http({
          method: 'PUT',
          headers: headers,
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
      var headers = {
        'Access-Control-Allow-Origin' : '*',
      };
      return $http({
          method: 'DELETE',
          headers: headers,
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
})();
