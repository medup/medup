var SignPage = (function() {
  function SignPage() {
    this.emailField = element(By.input("user.email"));
    this.passwordField = element(By.input("user.password"));
    this.loginButton = element(By.id("log-in"));
    this.currentUser = element(By.binding("{{currentUser.name}}"));
  }

  SignPage.prototype.visitPage = function() {
    browser.get("/");
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

  SignPage.prototype.getCurrentUser = function() {
    return this.currentUser.getText();
  };

  return SignPage;

})();

module.exports = SignPage;
