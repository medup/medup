(function() {
  'use strict';

  angular
    .module('medup.dashboard', ['ionic', 'ngCordova', 'ionic-material', 'nvd3'])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$state', '$ionicPlatform', '$cordovaLocalNotification'];


  function DashboardCtrl($scope, $state, $ionicPlatform, $cordovaLocalNotification) {
    $ionicPlatform.ready(function() {
      // mock data
      /**
       *
       * Medication Name
       * Instructions
       * Current Amount Remaining
       * Dosage
       * Date // 2016-02-06T20:08:56.298Z
       * Repeat every day
       */

      var medications = [{
        id: 1, // created on the server
        title: 'Take Medication Abilify (15mg)',
        text: 'Instructions',
        at: new Date(new Date().getTime() + 3000),
        every: 'minute'
      }, {
        id: 2,
        title: 'Take Medication Abilify (15mg)',
        text: 'Instructions',
        at: new Date(new Date().getTime() + 6000),
        every: 'minute'
      }, {
        id: 3,
        title: 'Take Medication Abilify (15mg)',
        text: 'Instructions',
        at: new Date(new Date().getTime() + 9000),
        every: 'minute'
      }];

      var cancelAllNotifications = function() {
        $cordovaLocalNotification.cancelAll()
          .then(function(medications) {
            console.log("all notifications cancelled", medications);
          })
          .catch(function(response) {
            console.error("error cancelling notifs", response);
          });
      };

      var scheduleMultipleNotifications = function() {
        $cordovaLocalNotification.schedule(medications)
          .then(function(medications) {
            console.log('all notifications set', medications);
          })
          .catch(function(response) {
            console.error("error schedualing notifs", response);
          });
      };

      cancelAllNotifications();
      scheduleMultipleNotifications();
    });

    /*----------  Testing Fake Data  ----------*/
    $scope.options = {
      chart: {
        type: 'stackedAreaChart',
        showControls: false,
        showYAxis: false,
        width: 520,
        height: 365,
        showXAxis: false,
        x: function(d) {
          return d[0];
        },
        y: function(d) {
          return d[1];
        },
        clipEdge: true,
        duration: 50,
        useInteractiveGuideline: false,
        xAxis: {
          showMaxMin: false,
          tickFormat: function(d) {
            return d3.time.format('%x')(new Date(d));
          }
        },
        yAxis: {
          tickFormat: function(d) {
            return d3.format(',.2f')(d);
          }
        }
      }
    };
    /**

      TODO:
      - Need to get the taken array, which is an array of date objects
      - Get the average of all the

     */

    /*----------  Fake Data  ----------*/
    $scope.data = [{
      "key": "Health",
      "color": "#E76666",
      "values": [
        [1025409600000, 90],
        [1028088000000, 89],
        [1030766400000, 80],
        [1033358400000, 90]
      ]
    }, {
      "key": "Compliance",
      "color": "#00cc99",
      "values": [
        [1025409600000, 100],
        [1028088000000, 50],
        [1030766400000, 70],
        [1033358400000, 50]
      ]
    }];
  }
})();
