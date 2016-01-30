var SignPage = (function() {
  function SignPage() {
    this.emailField = element(by.model("user.email"));
    this.passwordField = element(by.model("user.password"));
    this.loginButton = element(by.buttonText("Open MedUp"));
  }

  SignPage.prototype.visitPage = function() {
    browser.get("/#/signin");
  };

  SignPage.prototype.fillEmail = function(email) {
    this.emailField.sendKeys(email);
  };

  SignPage.prototype.fillPassword = function(password) {
    if (password === null) {
      password = "password";
    }
    this.passwordField.sendKeys(password);
  };

  SignPage.prototype.signup = function() {
    this.loginButton.click();
  };

  return SignPage;

})();

module.exports = SignPage;
