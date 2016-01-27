describe('Signup Authentication', function() {
   // var registerURL;
   // var email = element(by.name('register-email'));
   // var password = element(by.name('register-password));
   // var registerButton = element(by.xpath('//form[1]/input[@type="submit"]'));
   // var error = element(by.model('registerError'));
 
   it('should redirect to the register page if trying to load protected page while not authenticated', function() {
     browser.get('/#/signin');
     registerURL = browser.getCurrentUrl();
 
     browser.get('/#/');
     expect(browser.getCurrentUrl()).toEqual(registerURL);
   });
 
   it('should warn on missing/malformed credentials', function() {
     email.clear();
     password.clear();
 
     password.sendKeys('test');
     registerButton.click();
     expect(error.getText()).toMatch('missing email');
 
     email.sendKeys('test');
     registerButton.click();
     expect(error.getText()).toMatch('invalid email');
 
     email.sendKeys('@example.com');
     password.clear();
     registerButton.click();
     expect(error.getText()).toMatch('missing password');
   });
 
   it('should check if NEW email address and password is valid', function() {
     email.clear();
     password.clear();
 // updated to test against username & password in database
     email.sendKeys('test@example.com');
     password.sendKeys('test');
     registerButton.click();
     expect(browser.getCurrentUrl()).not.toEqual(registerURL);
   });
 
 });