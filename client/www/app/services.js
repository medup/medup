/**
 *
 * Factories will go here
 *
 */

(function() {
  'use strict';

  angular
    .module('starter.services', [])
    //TODO - REFACTOR FOR TOCKENS
    .service('LoginService', function($q) {
      return {
        //expects the name and password from the user
        // the promises to verify the user to a REST server - async
        loginUser: function() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          //if access is granted / promise is resolved
          if (name == 'user' && pw == 'secret') {
            deferred.resolve('Welcome ' + name + '!');
          } else {
            deferred.reject('Wrong credentials.');
          };
          promise.success = function(fn) {
            promise.then(fn);
            return promise;
          };
          promise.error = function() {
            promise.then(null, fn);
            return promise;
          };
          return promise;

        }
      };

    })
    //TODO - REFACTOR FOR TOCKENS
    .service('RegisterService', function($q) {
      return {
        //expects the name and password from the user
        // the promises to verify the user to a REST server - async
        registerUser: function() {
          var deferred = $q.defer();
          var promise = deferred.promise;
          //if access is granted / promise is resolved
          if (name == 'user' && pw == 'secret') {
            deferred.resolve('Success!');
          } else {
            deferred.reject('Wrong credentials.');
          }
          promise.success = function(fn) {
            promise.then(fn);
            return promise;
          };
          promise.error = function() {
            promise.then(null, fn);
            return promise;
          };
          return promise;

        }
      };
    })
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
          url: '/api/medications'
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

