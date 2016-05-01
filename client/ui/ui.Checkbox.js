/* global za */
za.ui.Checkbox = function(text, attr, isChecked) {

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
   .attr('tabindex', 0)
   .append([box, textSpan]);

   if(isChecked)
      element.addClass('checked');

   element.click(function(){
         element.toggleClass('checked');
   });

};

za.ui.Checkbox.prototype.isChecked = function(){
   return this.element.is('.checked');
};

za.ui.Checkbox.prototype.check = function(){
   return this.element.addClass('checked');
};

za.ui.Checkbox.prototype.uncheck = function(){
   return this.element.removeClass('checked');
};
