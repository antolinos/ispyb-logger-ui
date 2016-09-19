/*! ISPyB Logger UI - v0.1.0 - 2016-09-19
* https://github.com/antolinos/ispyb-logger-ui
* Copyright (c) 2016 A. de Maria; Licensed MIT */
(function($) {

  // Collection method.
  $.fn.ispyb_logger_ui = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.ispyb_logger_ui = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.ispyb_logger_ui.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.ispyb_logger_ui.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].ispyb_logger_ui = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
