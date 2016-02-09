"use strict";

class medicationsController {
  constructor($scope, MedFactory) {
    this.name = 'medications';
    this.scope = $scope;
    this.scope.medications = [];
    this.scope.MedFactory = MedFactory;
    this.scope.getMeds = MedFactory.getMeds;
    this.scope.apply = $scope.$apply;
    this.scope.deleteMeds = MedFactory.deleteMeds;
    this.scope.deleteItem = this.deleteItem;
    this.scope.editMeds = MedFactory.updateMeds;
    this.scope.startNotifications = this.startNotifications;
    this.scope.$on('$viewContentLoaded', function(e) {
      this.scope.getMeds()
      .then(medsArray => {
        this.scope.medications = medsArray;
        this.scope.startNotifications();
      });
      console.log(this.scope.medications);
      console.log("testing");
    }.bind(this));
  }

  deleteItem(id, index) {
   this.MedFactory.deleteMeds(id)
   .then(data => {
    console.log(id);
     this.medications.splice(index, 1);
   })
   .catch(data => {
     console.log("error");
   });
  }
  startNotifications() {

    if (!("Notification" in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    let notifications = [];
    let currentTime = new Date().getTime();

    // concat all notifications in each medication to single array
    this.medications.forEach((medication) => {
      notifications = notifications.concat(medication.notifications);
    });

    // sort notifications array from earliest to latest according to current time
    notifications.sort((a, b) => {
      if  (Date.parse(a.at) - currentTime < Date.parse(b.at) - currentTime && Date.parse(a.at) - currentTime > 0) {
        return -1;
      }
      return 1;
    });

    let createNotification = () => {

      let date, alarm;

      date = notifications.shift();
      currentTime = new Date().getTime();
      alarm = Date.parse(date.at) - currentTime;

      setTimeout(function() {
        let notification = new Notification(date.title, {
          body: date.text
        });
        setTimeout(function() {
          notification.close.call(notification);
        }, 4000);

        createNotification();

      }.bind(this), alarm);
    };

    Notification.requestPermission((permission) => {
      if (permission === 'granted') {
        createNotification();
      }
    });
  }
}

export default medicationsController;
