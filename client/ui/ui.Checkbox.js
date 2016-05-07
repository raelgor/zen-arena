/* global za */
za.ui.Checkbox = function(text, attr, isChecked, color) {

   var object = this;

   var box = $('<span>');
   box
   .addClass('za-checkbox-box')
   .html('<span class="icon-checkmark"></span>');

   var textSpan = $('<span>');
   textSpan
   .addClass('za-checkbox-text')
   .attr(attr)
   .html(text);

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

   this.isChecked = function(){
      return this.element.is('.checked');
   };

   this.check = function(){
      this.emit('checked');
      return this.element.addClass('checked');
   };

   this.uncheck = function(){
      this.emit('unchecked');
      return this.element.removeClass('checked');
   };

};

za.ui.Checkbox.prototype = EventEmitter2.prototype;
