// The semicolon finishes up possibly unfinished code from before.
;(function(global, $) {

  // 'new' an object
  var Greetr = function(firstName, lastName, language) {
    return new Greetr.init(firstName, lastName, language);
  };

  // Hidden within the scope of the IIFE and never directly accessible
  var supportedLanguages = ['en', 'es'];

  // Informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  // Formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  // Log messages
  var logMessages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  // Prototype holds methods (to save memory space).
  Greetr.prototype = {
    
    fullName: function() {
      // 'this' refers to the calling object at execution time.
      return this.firstName + ' ' + this.lastName;
    },

    // Checks that it is a valid language
    validate: function() {
      // References the externally inaccessible 'supportedLanguages' array
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw 'Invalid language';
      }
    },

    greeting: function() {
      // Refers to properties using [] syntax
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName() + '.';
    },

    greet: function(formal) {
      var message;

      // Determines the message
      // If 'undefined' or 'null', 'formal' will be coerced to 'false'.
      if (formal) {
        message = this.formalGreeting();
      } else {
        message = this.greeting();
      }

      if (console) {
        console.log(message);
      }

      // 'this' refers to the calling object at execution time.
      // Returning it makes the method chainable.
      return this;
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },

    setLanguage: function(language) {
      // Sets the language
      this.language = language;
      // Validates the language
      this.validate();
      
      // Makes method chainable
      return this;
    },

    htmlGreet: function(selector, formal) {
      if (!$) {
        throw 'jQuery not loaded';
      }

      if (!selector) {
        throw 'Missing jQuery selector';
      }

      var message;

      if (formal) {
        message = this.formalGreeting();
      } else {
        message = this.greeting();
      }

      // Injects the message in the chosen place in the DOM using jQuery
      $(selector).html(message);

      return this;
    }

  };

  // The actual object is created using this method.
  Greetr.init = function(firstName, lastName, language) {
    var self = this;
    self.firstName = firstName || 'John';
    self.lastName = lastName || 'Doe';
    self.language = language || 'en';

    self.validate();
  };

  // Trick borrowed from jQuery
  Greetr.init.prototype = Greetr.prototype;

  // Attaches our Greetr to the global object, and provides a shorthand '$G' for ease our poor fingers
  global.Greetr = global.G$ = Greetr;

}(window, jQuery));
