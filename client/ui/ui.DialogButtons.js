/**
 * Creates a set of buttons that emit events when clicked.
 * @class za.ui.DialogButtons
 * @param {Array}  buttons
 * @param {String} buttons.id The id that will emitted if the button is clicked.
 * @param {String} buttons.text Text Id for the button's displayed text.
 */
za.ui.DialogButtons = function(buttons) {

   var element = this.element = $('<div>');
   var object = this;

   element.addClass('dialog-buttons');

   buttons.forEach(function(options){
      var button = $('<button>');
      button
      .html(clientData.core_text[options.text])
      .attr('data-button-id', options.id)
      .attr('data-html-'+options.text, 1)
      .addClass('green button')
      .focus()
      .click(function(){
         /**
          * A button has been clicked.
          * @event za.ui.DialogButtons#click
          * @type {Object}
          */
         object.emit('click', options);
      });
      element.append(button);
   });

   /**
    * Focuses on a button by its id.
    * @method za.ui.DialogButtons.focus
    * @param {String} buttonId The id of the button to focus on.
    * @returns {za.ui.DialogButtons}
    */
   this.focus = function(buttonId){
      element.find('[data-button-id="'+buttonId+'"]').focus();
      return object;
   };

};

za.ui.DialogButtons.prototype = EventEmitter2.prototype;
