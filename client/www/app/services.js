/**
 *
 * Handles requests made to server via $http
 *
 */

(function() {
  'use strict';

  angular
    .module('medup.services', ['ionic', 'ngCordova'])
    .service('AuthService', AuthService)
    .service('MedService', MedService)
    .service('Notifications', Notifications)
    .factory('Medications', Medications);

  AuthService.$inject = ['$window', '$state', '$http'];
  MedService.$inject = ['$state', '$http'];
  Notifications.$inject = ['$cordovaLocalNotification', '$ionicPlatform'];
  Medications.$inject = ['MedService'];

  function AuthService($window, $state, $http) {
    this.hasToken = function() {
      return !!$window.localStorage.getItem('com.medUp');
    };

    this.signin = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/user/signin',
          data: user
        })
        .then(function(response) {
          $window.localStorage.setItem('com.medUp', response.data.token);
          //return response.data.token;
        });
    };

    this.register = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/user/signup',
          data: user
        })
        .then(function(response) {
          $window.localStorage.setItem('com.medUp', response.data.token);
          //return response.data.token;
        });
    };

    this.logout = function() {
      $window.localStorage.removeItem('com.medUp');
      $state.go('/signin');
    };
  }

  function MedService($state, $http) {
    this.getMeds = function(user) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3000/api/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };

    this.addMed = function(medication) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/medications',
          data: medication
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
          url: 'http://localhost:3000/api/medications',
          data: user
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };

    this.deleteMeds = function(medId) {
      return $http({
          method: 'DELETE',
          url: 'http://localhost:3000/api/medications/' + medId
          //data: 
        })
        .then(function(response) {
          return response.data;
        }, function(err) {
          return err;
        });
    };
  }

  function Notifications($cordovaLocalNotification, $ionicPlatform) {
    var that = this;
    $cordovaLocalNotification.registerPermission();
    that.scheduleNotifications = function(notifs) {
      $cordovaLocalNotification.schedule(notifs).then(function() {
        alert("Instant Notification set");
      });
    };
  }

  function Medications() {
    var medFac = {};
    medFac.userMeds = {dbMeds: []};
    // MedService.getMeds(user)
    //   .then(function(medInfoArr) {
    //     medFac.userMeds.dbMeds = medInfoArray;
    //   }).catch(function(medInfoArr) {
    //     console.log("ERROR: User Medications not Received");
    //   });

    //medFac.userMeds.localMeds = testMeds;
    
    return medFac;
  }

})();
