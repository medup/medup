(function() {
  'use strict';

  angular
    .module('medup.dashboard', ['ionic', 'ngCordova', 'ionic-material', 'nvd3', 'siyfion.sfTypeahead', 'jsTag'])
    .controller('DashboardCtrl', DashboardCtrl);

  DashboardCtrl.$inject = ['$scope', '$state', '$ionicModal', '$ionicPlatform', '$cordovaLocalNotification', 'JSTagsCollection'];


  function DashboardCtrl($scope, $state, $ionicModal, $ionicPlatform, $cordovaLocalNotification, JSTagsCollection) {
    $ionicPlatform.ready(function() {

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

      $scope.openFatigue = function() {
        $scope.fatigue.modal.show();
      };

      $scope.openSideEffects = function() {
        $scope.sideeffects.modal.show();
      };

      $scope.openOverallHealth = function() {
        $scope.overallHealth.modal.show();
      };

      $scope.complete = function() {
        var modals = ['pain', 'fatigue', 'sideeffects', 'overallHealth'];

        for (var i = 0; i < modals.length; i++) {
          $scope[modals[i]].modal.hide();
        }
      };

      $scope.closeModal = function(name) {
        $scope[name].modal.hide();
      };

      /*----------  Tags and Typeahead  ----------*/

      // Build JSTagsCollection
      $scope.tags = new JSTagsCollection(["jsTag", "angularJS"]);
      console.log($scope.tags);

      // Export jsTags options, inlcuding our own tags object
      $scope.jsTagOptions = {
        'tags': $scope.tags
      };

      // **** Typeahead code **** //

      // Build suggestions array
      var suggestions = ['jsTag', 'c#', 'java', 'javascript', 'jquery', 'android', 'php', 'c++', 'python', 'ios', 'mysql', 'iphone', 'sql', 'html', 'css', 'objective-c', 'ruby-on-rails', 'c', 'sql-server', 'ajax', 'xml', '.net', 'ruby', 'regex', 'database', 'vb.net', 'arrays', 'eclipse', 'json', 'django', 'linux', 'xcode', 'windows', 'html5', 'winforms', 'r', 'wcf', 'visual-studio-2010', 'forms', 'performance', 'excel', 'spring', 'node.js', 'git', 'apache', 'entity-framework', 'asp.net', 'web-services', 'linq', 'perl', 'oracle', 'action-script', 'wordpress', 'delphi', 'jquery-ui', 'tsql', 'mongodb', 'neo4j', 'angularJS', 'unit-testing', 'postgresql', 'scala', 'xaml', 'http', 'validation', 'rest', 'bash', 'django', 'silverlight', 'cake-php', 'elgg', 'oracle', 'cocoa', 'swing', 'mocha', 'amazon-web-services'];
      suggestions = suggestions.map(function(item) {
        return {
          "suggestion": item
        };
      });

      // Instantiate the bloodhound suggestion engine
      suggestions = new Bloodhound({
        datumTokenizer: function(d) {
          return Bloodhound.tokenizers.whitespace(d.suggestion);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: suggestions
      });

      // Initialize the bloodhound suggestion engine
      suggestions.initialize();

      // Single dataset example
      $scope.exampleData = {
        displayKey: 'suggestion',
        source: suggestions.ttAdapter()
      };

      // Typeahead options object
      $scope.exampleOptions = {
        hint: false,
        highlight: true
      };


      /*----------  Notifications  ----------*/
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
