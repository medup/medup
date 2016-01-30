var LoginPage = require("./pages/authPage");
require('jasmine-given');

describe("app", function() {
  var page = new LoginPage();
  describe("visiting the login page", function() {
    Given(function() {
      page.visitPage();
    });
    describe("when a user logs in", function() {
      Given(function() {
        page.fillEmail("testy@example.com");
      });
      Given(function() {
        page.fillPassword('fasfasdfas');
      });
      When(function() {
        page.login();
      });
      Then(function() {
        page.getCurrentUser().then(function(text) {
          expect(text).toEqual("Randy Savage");
        });
      });
    });
  });
});
// /* Rest of the modules to verify user creation */
// it('Verify logout', function() {
//   loginMod.logout();
// });
// it('should redirect to the login page if trying to load protected page while not authenticated', function() {
//   browser.get('/#/login');
//   loginURL = browser.getCurrentUrl();

//   browser.get('/#/');
//   expect(browser.getCurrentUrl()).toEqual(loginURL);
// });

// it('should warn on missing/malformed credentials', function() {
//   email.clear();
//   password.clear();

//   password.sendKeys('test');
//   loginButton.click();
//   expect(error.getText()).toMatch('missing email');

//   email.sendKeys('test');
//   loginButton.click();
//   expect(error.getText()).toMatch('invalid email');

//   email.sendKeys('@example.com');
//   password.clear();
//   loginButton.click();
//   expect(error.getText()).toMatch('missing password');
// });

// it('should return to the login page after logout', function() {
//   var logoutButton = $('a.logout');
//   logoutButton.click();
//   expect(browser.getCurrentUrl()).toEqual(loginURL);
// });

// expect(input.getAttribute('value')).toBe('Foo123');

// describe('Register Authentication', function() {
//   var registerURL;

//   it('should redirect to the register page if trying to load protected page while not authenticated', function() {
//     browser.get('/#/register');
//     registerURL = browser.getCurrentUrl();

//     browser.get('/#/');
//     expect(browser.getCurrentUrl()).toEqual(registerURL);
//   });

//   it('should warn on missing/malformed credentials', function() {
//     email.clear();
//     password.clear();

//     password.sendKeys('test');
//     registerButton.click();
//     expect(error.getText()).toMatch('missing email');

//     email.sendKeys('test');
//     registerButton.click();
//     expect(error.getText()).toMatch('invalid email');

//     email.sendKeys('@example.com');
//     password.clear();
//     registerButton.click();
//     expect(error.getText()).toMatch('missing password');
//   });

//   it('should check if NEW email address and password is valid', function() {
//     email.clear();
//     password.clear();
//     // updated to test against username & password in database
//     email.sendKeys('test@example.com');
//     password.sendKeys('test');
//     registerButton.click();
//     expect(browser.getCurrentUrl()).not.toEqual(registerURL);
//   });

// });
