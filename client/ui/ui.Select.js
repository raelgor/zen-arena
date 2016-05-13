za.ui.Select = function(options){

   var element = this.element = $('<div>');

   element.html('<span class="text"></span><span class="icon-list2"></span>');
   element.find('.text').html(options.name);

   var object = this;

   element.addClass('ui-select');
   element.attr('tabindex', 0);

   element.click(function(){

      var selector = new za.ui.DataSelector(options);

      selector.spawn();

      selector.on('new', function(selection){
         object.emit('change', selection);
         element.find('.text').html(selection[options.rowTitle]);
      });

   });

};

za.ui.Select.prototype = EventEmitter2.prototype;
