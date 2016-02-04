/**
 *
 * Displays the medication sorted from most recent to allow the 
 * user to see what medication they have to take next
 */

(function() {
  'use strict';

  angular
    .module('medup.calendar', ['ionic', 'ionic-material', 'nvd3'])
    .controller('CalendarCtrl', CalendarCtrl);
  CalendarCtrl.$inject = ['$scope', '$state'];

  function CalendarCtrl($scope, $state) {
    /*----------  Fake Medication Data  ----------*/
    $scope.data = {};
    $scope.data.medications = [{
      image: "../img/pill.png",
      name: "Lisinopril",
      dosage: "15mg",
      remaining: 25,
      date: "2015-07-28T04:33:01.852z",
      instruction: "BY MOUTH / WITH FOOD"
    }, {
      image: "../img/pill.png",
      name: "Lisinopril",
      dosage: "15mg",
      remaining: 25,
      date: "2015-07-28T04:33:01.852z",
      instruction: "BY MOUTH / WITH FOOD"
    }, {
      image: "../img/pill.png",
      name: "Lisinopril",
      dosage: "15mg",
      remaining: 25,
      date: "2015-07-28T04:33:01.852z",
      instruction: "BY MOUTH / WITH FOOD"
    }, {
      image: "../img/pill.png",
      name: "Lisinopril",
      dosage: "15mg",
      remaining: 25,
      date: "2015-07-28T04:33:01.852z",
      instruction: "BY MOUTH / WITH FOOD"
    }];
  }

})();
