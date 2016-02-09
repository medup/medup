"use strict";

let moment = require('moment');

class medicationsController {
  constructor($scope, MedFactory) {
    this.name = 'medications';
    this.scope = $scope;
    this.scope.medications = [];
    this.scope.notifications = [];
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
        this.scope.medications.forEach((medication) => {
          this.scope.notifications = this.scope.notifications.concat(medication.notifications);
        });
        this.scope.notifications.forEach((notification) => {
          notification.at = moment().to(notification.at);
        });
        this.scope.startNotifications();
      });
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

    // let notifications = [];
    let currentTime = new Date().getTime();

    // concat all notifications in each medication to single array
    // this.medications.forEach((medication) => {
    //   notifications = notifications.concat(medication.notifications);
    // });
    //
    // notifications.forEach((notification) => {
    //   let date = new Date(Date.parse(notification.at));
    //   notification.at = date.getHours() + ':' + date.getMinutes();
    // });

    // sort notifications array from earliest to latest according to current time
    this.notifications.sort((a, b) => {
      if (a.at - currentTime < b.at - currentTime && a.at - currentTime > 0) {
        return -1;
      }
      return 1;
    });

    let createNotification = () => {

      let date, alarm;

      date = this.notifications.shift();
      currentTime = new Date().getTime();
      alarm = Date.parse(date.at) - currentTime;

      setTimeout(function() {
        console.log('displayed notification');
        let notification = new Notification(date.title, {
          body: date.text
        });
        setTimeout(function() {
          console.log('closed notification');
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
