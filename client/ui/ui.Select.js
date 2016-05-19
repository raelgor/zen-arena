/**
 * A select tag replacement that spawns a {@link za.ui.DataSelector}.
 * @class za.ui.Select
 * @param {Object} element A {@link za.ui.DataSelector} options object with an
 * extra `name` property which will be displayed as the DOM element label.
 */
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
         /**
          * Select has a new value.
          * @event za.ui.Select#change
          */
         object.emit('change', selection);
         element.find('.text').html(selection[options.rowTitle]);
      });

   });

};

za.ui.Select.prototype = EventEmitter2.prototype;
