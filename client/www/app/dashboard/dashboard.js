(function() {
  'use strict';

  angular
    .module('starter.dashboard', ['ionic', 'ionic-material'])
    .controller('DashboardCtrl', function($scope, $state, $ionicModal, $timeout, MedService) {

      $ionicModal.fromTemplateUrl('app/dashboard/more-information.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
      });
      $scope.medication = {};
      $scope.medStatus = {};

      /* Get med data when user enters dashboard */
      var getMedData = function(user) {
        MedService.getMeds(user)
          .success(function(medInfoArr) {
            $scope.medication = medInfoArr;
          }).error(function(medInfoArr) {
            console.log("Error Retrieving Information");
          });
      };

      getMedData();

      $scope.moreInformation = function(medication) {
        $scope.medication = medication;
        $scope.modal.show();
      };

      $scope.removeReminder = function(medication) {

        /**

          TODO:
          - remove reminder from dashboard view
          - remove reminder from database

         */
      };

      $scope.editMedication = function(medication) {
        /**

          TODO:
          - route to medsForm state passing in the information for placeholder
          - should update the database when information is edited and reflect on dashboard
          - should route to dashboard when editing is complete
          - should be able to add multiple alarms on medForm for that medication

         */

      };

      /**

        TODO:
        - get the image of the medication and add it to correct medication (Complex)
          - looked into pillbox and some other apis. this is going to be tricky
          - i haven't found a way to get the information through the code or the name of med
        - Create edit medication form as a sub template of medsForm
        - Get Notifications Working (Robert)
        - Create Routes to Back-End
          - Read from database and set medication object of user in controller
          - Write to database the medication info the user types in (Dave)

       */
      /* Fake data to test dashboard */
      $scope.medications = [{
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
      }];

    });
})();
