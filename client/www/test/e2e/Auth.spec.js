describe('AuthCtrl', function() {
   var username, password, signinButton;
   var signinURL, ionicPopup;
   var controller = null;
   $scope = null;

    beforeEach(function() {
      module('starter.auth');
      browser.get('/#/signin');
      username = element(by.model('data.username'));
      password = element(by.model('data.password'));
      signinButton = element(by.buttonText('Submit'));
    });

    beforeEach(inject(function ($controller, $rootScope) {
      $scope = $rootScope.$new();
      controller = $controller('AuthCtrl', {
      $scope: $scope
    });
  }));
 
   it('should redirect to the signin page if trying to load protected page while not authenticated', function() {
     browser.get('/#/signin');
     signinURL = browser.getCurrentUrl();
 
     browser.get('/#/signin');
     expect(browser.getCurrentUrl()).toEqual(signinURL);
   });
 
   it('should validate credentials', function($q) {
    username.sendKeys('gonehybrid');
    password.sendKeys('password');

    loginButton.click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('/#/dashboard');
 
   });
 
   it('should accept a valid username address and password', function() {
     username.sendKeys('gonehybrid');
     password.sendKeys('idontknow');

    loginButton.click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('/login');

        var popup = element(by.css('.popup-container.popup-showing.active'));
        expect(popup.isDisplayed()).toBeTruthy();
    });
 
 }); 
