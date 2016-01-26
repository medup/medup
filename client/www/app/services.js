
/**
 *
 * Factories will go here
 *
 */

(function() {
  'use strict';

  angular
    .module('starter.services', [])
    .service('Auth', [$window, $state, $http, function($window, $state, $http) {  

      this.hasToken = function() {
        return !!$window.localStorage.getItem('com.pillMeNow');
      };

      this.signin = function (user) {
        return $http({
          method: 'POST',
          url: '/users/signin',
          data: user
        })
        .then(function (response) {
          return response.data.token;
        });
      };

      this.signup = function (user) {
        return $http({
          method: 'POST',
          url: '/users/signup',
          data: user
        })
        .then(function (response) {
          return response.data.token;
        });
      };

      this.signout = function () {
        $window.localStorage.removeItem('com.pillMeNow');
        $state.go('/signin');
      };
    }])
    .service('MedService', function($http) {
      var medication = {};

      medication.getMeds = function(user) {
        /**



          TODO:
          - sends GET request to get the array of med objects from database that matches the user



         */
        /* Mock Data */
        return $http({
          method: 'GET',
          url: '/medications'
        });
      };
      medication.updateMeds = function() {
        /**



          TODO:
          - sends PUT request to update that specific medicaiton for the user



         */

      };
      medication.deleteMeds = function() {
        /**



          TODO:
          - sends DELETE request to remove that medication of the user



         */

      };

      return medication;
    });


})();



