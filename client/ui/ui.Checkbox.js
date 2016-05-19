/**
 * Creates a checkbox element.
 * @class za.ui.Checkbox
 * @param {String} [text=''] Raw html that will serve as the checkbox's label.
 * @param {Object} [attr={}] Attributes object.
 * @param {Boolean} [isChecked=false] Initial state.
 * @param {String} [color='dark'] Color theme.
 */
za.ui.Checkbox = function(text, attr, isChecked, color) {

   var object = this;

   var box = $('<span>');
   box
   .addClass('za-checkbox-box')
   .html('<span class="icon-checkmark"></span>');

   var textSpan = $('<span>');
   textSpan
   .addClass('za-checkbox-text')
   .attr(attr||{})
   .html(text||'');

   /**
    * The DOM element.
    * @type {DOMElement}
    */
   var element = this.element = $('<span>');

   element
   .addClass('za-checkbox')
   .addClass(color ? color : 'dark')
   .attr('tabindex', 0)
   .append([box, textSpan]);

   element.keydown(function(e){
      e.keyCode === 13 &&
      $(element).click();
   });

   element.focus(function(){
      object.emit('focus');
   });

   element.blur(function(){
      object.emit('blur');
   });

   if(isChecked)
      element.addClass('checked');

   element.click(function(){
         element.toggleClass('checked');
         element.is('.checked') ?
         object.emit('checked') :
         object.emit('unchecked');
   });

   /**
    * Gets the current status of the checkbox.
    * @method za.ui.Checkbox.isChecked
    * @returns {Boolean}
    */
   this.isChecked = function(){
      return this.element.is('.checked');
   };

   /**
    * Checks and emits checked.
    * @emits za.ui.Checkbox#checked
    * @method za.ui.Checkbox.check
    */
   this.check = function(){
      /**
       * Checkbox has been checked.
       * @event za.ui.Checkbox#checked
       */
      this.emit('checked');
      return this.element.addClass('checked');
   };

   /**
    * Unchecks and emits uncheck.
    * @emits za.ui.Checkbox#unchecked
    * @method za.ui.Checkbox.uncheck
    */
   this.uncheck = function(){
      /**
       * Checkbox has been unchecked.
       * @event za.ui.Checkbox#unchecked
       */
      this.emit('unchecked');
      return this.element.removeClass('checked');
   };

};

za.ui.Checkbox.prototype = EventEmitter2.prototype;
