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
    .factory('Medications', Medications);
   
  AuthService.$inject = ['$window', '$state', '$http'];
  MedService.$inject = ['$state', '$http'];
  Medications.$inject = ['MedService'];
  
  function AuthService($window, $state, $http) {
    this.hasToken = function() {
      return !!$window.localStorage.getItem('com.pillMeNow');
    };

    this.signin = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3003/user/signin',
          data: user
        })
        .then(function(response) {
          $window.localStorage.setItem('com.pillMeNow', response.data.token);
          //return response.data.token;
        });
    };

    this.signup = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3003/user/signup',
          data: user
        })
        .then(function(response) {
          $window.localStorage.setItem('com.pillMeNow', response.data.token);
          //return response.data.token;
        });
    };

    this.signout = function() {
      $window.localStorage.removeItem('com.pillMeNow');
      $state.go('signin');
    };
  }

  function MedService($state, $http) {
    this.getMeds = function(user) {
      return $http({
          method: 'GET',
          url: 'http://localhost:3003/api/medications',
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
          url: 'http://localhost:3003/api/medications',
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
          url: 'http://localhost:3003/api/medications',
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
    medFac.userMeds = {};
    // MedService.getMeds(user)
    //   .then(function(medInfoArr) {
    //     medFac.userMeds.dbMeds = medInfoArray;
    //   }).catch(function(medInfoArr) {
    //     console.log("ERROR: User Medications not Received");
    //   });
    
    var testMeds = [{
      id: 12,
      name: "Abilify (Aripiprazole)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123,
      name: "Actiq (Fentanyl Citrate)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 1234,
      name: "Halcion (Triazolam)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 12345,
      name: "Quinidex (Quinidine)",
      dosage: "5mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }, {
      id: 123456,
      name: "Adderall (Amphetamine)",
      dosage: "10mg",
      instruction: "Take one tablet by mouth every morning",
      reminder: "10:30AM Every Day",
      image: "http://pillbox.nlm.nih.gov/assets/small/540920173.jpg"
    }];
    
    medFac.userMeds.localMeds = testMeds;
    return medFac;
  };
  
})();
