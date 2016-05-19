/**
 * Creates a dark background setting.
 * @class za.ui.Darkness
 */
za.ui.Darkness = function(){

   var element = this.element = $('<div>');
   var object = this;

   element.addClass('darkness-container');

   /**
    * Fades the darkness into existence (what?).
    * @method za.ui.Darkness.spawn
    * @returns {za.ui.Darkness}
    */
   this.spawn = function() {
      if($('.darkness-container').length)
         $('.darkness-container').remove();
      $('body').append(element);

      element.animate({opacity:1}, 250, 'swing');
      return object;
   };

   /**
    * Fades the darkness away and removes the element.
    * @method za.ui.Darkness.fade
    * @returns {za.ui.Darkness}
    */
   this.fade = function() {
      element.animate({opacity:0}, 200, 'swing', function(){
         element.remove();
      });
      return object;
   };

   element.click(function(e){
      /**
       * The shadow element has been clicked directly
       * @event za.ui.Darkness#click
       * @type {MouseEvent}
       */
      object.emit('click', e);
   });

};

za.ui.Darkness.prototype = EventEmitter2.prototype;
