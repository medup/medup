var loginPage = function() {
  'use strict';
  this.userName = element(by.model('data.email'));
  this.password = element(by.model('data.password'));
  this.submitButton = element(by.css('.login-form button[type="submit"]'));
  //******************** functions *******************
  this.setUserName = function(username) {
    this.userName.clear();
    this.userName.sendKeys(username);
  };
  this.clickSubmit = function() {
    this.submitButton.click();
  };
};

module.exports = {
  log: new loginPage()
};
