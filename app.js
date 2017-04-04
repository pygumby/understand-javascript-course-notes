// Create a 'Greetr' for John Doe
// Default language: English
var greetr = G$('John', 'Doe');

// Greet John Doe informally as well as formally on the console
greetr.greet(); // coerces to 'greetr.greet(false);'
greetr.greet(true);

// Switch language to Spanish and do the same thing again
greetr.setLanguage('es').greet(); // Notice: Chainability!
greetr.greet(true);

// Now let's see how to use a jQuery selector to display a greeting in an HTML document!
// The following code breathes life into the login form in 'index.html'.
$('#login').click(function() {
  // Creates a new 'Greetr' object
  var loginGreetr = Greetr('John', 'Doe'); // 'G$()' is just a shorthand for 'Greetr()'.

  // Hides the login form after the button has been clicked
  $('#login-div').hide();

  // Fires off a (formal) HTML greeting, passing '#greeting' as the selector as well as the chosen language
  // Logs as well
  loginGreetr.setLanguage($('#language').val()).htmlGreet('#greeting', true).log();
});
