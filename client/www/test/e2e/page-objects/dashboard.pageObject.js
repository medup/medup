  /* grandfather.pageObject.js */

var GrandfatherOfAllKnowledge = function() {
      this.question = element(by.model('question.text'));
      this.answer = element(by.binding('answer'));
      this.button = element(by.className('question__button'));

      this.askQuestion = function(question) {
          this.question.sendKeys(question);
          this.button.click();
      };
  };