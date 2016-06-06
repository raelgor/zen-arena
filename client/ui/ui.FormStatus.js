/**
 * Creates a form status element or binds methods to an existing one.
 * @class za.ui.FormStatus
 * @param {Object} DOMElement The element to bind to.
 */
za.ui.FormStatus = function(element){

  element = $(element) || $('<div>');

  element
  .addClass('form-status')
  .html('');

  function updateText(text){
    element.html(text);
  }

  this.error = function(text){
    element.css('color', 'red');
    updateText(text);
  };

  this.success = function(text){
    element.css('color', 'green');
    updateText(text);
  };

  this.clear = function(){
    updateText('');
  };

};

za.ui.FormStatus.prototype = EventEmitter2.prototype;
