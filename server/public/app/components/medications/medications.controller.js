"use strict";

let moment = require('moment');

class medicationsController {
  constructor($state, $scope, MedFactory) {
    this.name = 'medications';
    this.scope = $scope;
    this.scope.editsId = "";
    this.scope.medications = [];
    this.scope.notifications = [];
    this.scope.display = [];
    this.scope.MedFactory = MedFactory;
    this.scope.deleteItem = this.deleteItem;
    this.scope.editItem = this.editItem;
    this.scope.startNotifications = this.startNotifications;

    this.scope.$on('$viewContentLoaded', function(e) {
      this.scope.getMeds()
      .then(medsArray => {
        this.scope.medications = medsArray;

        // concat all notifications in each medication to a single array
        this.scope.medications.forEach((medication) => {
          this.scope.display = this.scope.display.concat(medication.notifications);
        });


        this.scope.display.forEach((notification) => {
          let currentTime = new Date();

          // recreate notification's time relative to current year, month, and date
          notification.at = new Date(notification.at);
          notification.at = new Date(
            currentTime.getFullYear(),
            currentTime.getMonth(),
            currentTime.getDate(),
            notification.at.getHours(),
            notification.at.getMinutes(),
            notification.at.getSeconds(),
            notification.at.getMilliseconds()
          );

          this.scope.notifications.push({
            title: notification.title,
            text: notification.text,
            at: notification.at.getTime()
          });

          // use moment to format notification time
          notification.at = moment().to(notification.at);
        });
        this.scope.startNotifications();
      });
    }.bind(this));
  }

  deleteItem(id, index) {
   this.MedFactory.deleteMed(id)
   .then(data => {
    console.log(id);
     this.medications.splice(index, 1);
   })
   .catch(data => {
     console.log("error");
   });
  }

  editItem(id) {
   this.editsId = id;
   this.state.go('edit-medication');
  }
  startNotifications() {

    if (!("Notification" in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    let currentTime = new Date().getTime();

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
      alarm = date.at - currentTime;

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
