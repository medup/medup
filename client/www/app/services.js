/**
 *
 * Factories will go here
 *
 */

(function() {
  'use strict';

  angular
    .module('starter.services', [])
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
          }
          promise.success = function(fn) {
            promise.then(fn);
            return promise;
          }
          promise.error = function() {
            promise.then(null, fn);
            return promise;
          }
          return promise;
        }
      }
    })




})();
