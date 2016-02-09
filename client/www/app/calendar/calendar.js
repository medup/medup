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
  CalendarCtrl.$inject = ['$scope', '$state', 'MedService'];

  function CalendarCtrl($scope, $state, MedService) {
    var medications = [];
    /*----------  Fake Medication Data  ----------*/

    // var medications = [{
    //   info: {
    //     name: 'Lisinopril',
    //     dosage: 15,
    //     instruct: 'BY MOUTH / WITH FOOD'
    //   },
    //   taken: [new Date(), new Date(), new Date("2016-02-05")],
    //   notifications: [{
    //     id: 1, // created on the server
    //     title: 'Take Medication Lisinopril (15mg)',
    //     text: 'Instructions',
    //     at: new Date("2015-03-25T15:00:00"),
    //     every: 'day'
    //   }, {
    //     id: 2,
    //     title: 'Take Medication Lisinopril (15mg)',
    //     text: 'Instructions',
    //     at: new Date("2015-03-25T15:30:00"),
    //     every: 'day'
    //   }]
    // }, {
    //   info: {
    //     name: 'Gummybears',
    //     dosage: 15,
    //     instruct: 'BY MOUTH / WITH FOOD'
    //   },
    //   taken: [new Date()],
    //   notifications: [{
    //     id: 4, // created on the server
    //     title: 'Take Medication Gummybears (15mg)',
    //     text: 'Instructions',
    //     at: new Date(),
    //     every: 'day'
    //   }]
    // }, {
    //   info: {
    //     name: 'Adderall',
    //     dosage: 15,
    //     instruct: 'BY MOUTH / WITH FOOD'
    //   },
    //   taken: [],
    //   notifications: [{
    //     id: 8, // created on the server
    //     title: 'Take Medication Adderall (15mg)',
    //     text: 'Instructions',
    //     at: new Date("2016-02-25T15:00:00"),
    //     every: 'day'
    //   }, {
    //     id: 9,
    //     title: 'Take Medication Adderall (15mg)',
    //     text: 'Instructions',
    //     at: new Date("2016-02-25T15:30:00"),
    //     every: 'day'
    //   }, {
    //     id: 10,
    //     title: 'Take Medication Adderall (15mg)',
    //     text: 'Instructions',
    //     at: new Date("2016-02-25T24:00:00"),
    //     every: 'day'
    //   }]
    // }];

    $scope.take = function() {
      var now = new Date();
      MedService.addTaken(now)
        .then(function() {
          console.log('working');
        });
    };

    var convertTime = function(date) {
      if (date instanceof Date) {
        var day = date.getDate();
        var year = date.getFullYear();
        var month = date.getMonth();

        return month + '-' + day + '-' + year;
      }
    };

    var now = new Date();
    var today = convertTime(now);

    var completed = function() {
      return medications.filter(function(med) {
        var last = med.taken[med.taken.length - 1];
        var medToday = convertTime(last);
        return medToday === today;
      });
    };

    var remaining = function() {
      return medications.filter(function(med) {
        var last = med.taken[med.taken.length - 1];
        var medToday = convertTime(last);
        return medToday !== today;
      });
    };

    if (medications) {
      $scope.completed = completed();
      $scope.remaining = remaining();
    }
  }

})();
