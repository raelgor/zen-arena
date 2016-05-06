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
         object.emit('click', options);
      });
      element.append(button);
   });

   this.focus = function(buttonId){
      element.find('[data-button-id="'+buttonId+'"]').focus();
      return object;
   };

};

za.ui.DialogButtons.prototype = EventEmitter2.prototype;
