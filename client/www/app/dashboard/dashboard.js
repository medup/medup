(function() {
  'use strict';

  angular
    .module('medup.dashboard', ['ionic', 'ngCordova', 'ionic-material', 'nvd3', 'jsTag'])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$state', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', 'JSTagsCollection'];


  function DashboardCtrl($scope, $state, $ionicModal, $ionicPlatform, $cordovaLocalNotification, JSTagsCollection) {
    $ionicPlatform.ready(function() {
      /*----------  Data  ----------*/

      $scope.dailylog = {};

      $scope.data = {
        'value': 50
      };

      /*----------  Modal  ----------*/
      var createModal = function(url, animation, name) {
        $ionicModal.fromTemplateUrl(url, {
          scope: $scope,
          animation: animation,
          backdropClickToClose: true,
          hardwareBackButtonClose: true,
          focusFirstInput: true
        }).then(function(modal) {
          $scope[name] = {};
          $scope[name].modal = modal;
        });
      };

      createModal('app/healthlog/pain.html', 'slide-in-up', 'pain');
      createModal('app/healthlog/fatigue.html', 'jelly', 'fatigue');
      createModal('app/healthlog/sideeffects.html', 'jelly', 'sideeffects');
      createModal('app/healthlog/overallHealth.html', 'jelly', 'overallHealth');

      $scope.openPain = function() {
        $scope.pain.modal.show();
      };

      $scope.openFatigue = function(painInput) {
        $scope.dailylog.painInput = painInput || 50;
        $scope.fatigue.modal.show();

      var cancelAllNotifications = function() {
        // $cordovaLocalNotification.cancelAll()
        //   .then(function(result) {
        //     console.log("all notifications cancelled", result);
        //   })
        //   .catch(function(response) {
        //     console.error("error cancelling notifs", response);
        //   });
      };

      var scheduleMultipleNotifications = function() {
        // $cordovaLocalNotification.schedule(example)
        //   .then(function(result) {
        //     console.log('all notifications set');
        //   })
        //   .catch(function(response) {
        //     console.error("error schedualing notifs", response);
        //   });
      };

      $scope.openSideEffects = function(fatigueInput) {
        $scope.dailylog.fatigueInput = fatigueInput || 50;
        $scope.sideeffects.modal.show();
      };

      $scope.openOverallHealth = function() {
        $scope.overallHealth.modal.show();
        $scope.dailylog.sideEffects = $scope.dailySideEffects.tags;
      };

      $scope.complete = function(choice) {
        $scope.dailylog.overallHealth = choice || "left blank";
        console.log("dailylog", $scope.dailylog);
        var modals = ['pain', 'fatigue', 'sideeffects', 'overallHealth'];

        for (var i = 0; i < modals.length; i++) {
          $scope[modals[i]].modal.hide();
        }
      };

      $scope.closeModal = function(name) {
        $scope[name].modal.hide();
      };

      /*----------  Tags  ----------*/

      // Build JSTagsCollection
      $scope.dailySideEffects = new JSTagsCollection(["Nausea"]);

      // Export jsTags options, inlcuding our own tags object
      $scope.jsTagOptions = {
        'tags': $scope.dailySideEffects,
        'edit': true,
        'defaultTags': [],
        'breakCodes': [
          13, // Return
          44 // Comma
        ],
        'splitter': ',',
        'texts': {
          'inputPlaceHolder': "Here",
          'removeSymbol': String.fromCharCode(215)
        }
      };
      /*----------  Notifications  ----------*/
      // var medications = [{
      //   id: 1, // created on the server
      //   title: 'Take Medication Abilify (15mg)',
      //   text: 'Instructions',
      //   at: new Date(new Date().getTime() + 3000),
      //   every: 'minute'
      // }, {
      //   id: 2,
      //   title: 'Take Medication Abilify (15mg)',
      //   text: 'Instructions',
      //   at: new Date(new Date().getTime() + 6000),
      //   every: 'minute'
      // }, {
      //   id: 3,
      //   title: 'Take Medication Abilify (15mg)',
      //   text: 'Instructions',
      //   at: new Date(new Date().getTime() + 9000),
      //   every: 'minute'
      // }];

      // var cancelAllNotifications = function() {
      //   $cordovaLocalNotification.cancelAll()
      //     .then(function(medications) {
      //       console.log("all notifications cancelled", medications);
      //     })
      //     .catch(function(response) {
      //       console.error("error cancelling notifs", response);
      //     });
      // };

      // var scheduleMultipleNotifications = function() {
      //   $cordovaLocalNotification.schedule(medications)
      //     .then(function(medications) {
      //       console.log('all notifications set', medications);
      //     })
      //     .catch(function(response) {
      //       console.error("error schedualing notifs", response);
      //     });
      // };

      // cancelAllNotifications();
      // scheduleMultipleNotifications();

      /*----------  Graph  ----------*/
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

      /*----------  Fake Data  ----------*/
      // add this everyday
      // [timestamp, healthNum]
      // [timestamp, complianceNum]

      var healthData = [
        [1025409600000, 90],
        [1028088000000, 89],
        [1030766400000, 80],
        [1033358400000, 90]
      ];

      var complianceData = [
        [1025409600000, 100],
        [1028088000000, 50],
        [1030766400000, 70],
        [1033358400000, 50]
      ];

      $scope.data.dashgraph = [{
        "key": "Health",
        "color": "#E76666",
        "values": healthData
      }, {
        "key": "Compliance",
        "color": "#00cc99",
        "values": complianceData
      }];

    });
  }
})();
