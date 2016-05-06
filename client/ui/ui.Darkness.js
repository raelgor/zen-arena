za.ui.Darkness = function(){

   var element = this.element = $('<div>');
   var object = this;

   element.addClass('darkness-container');

   this.spawn = function() {
      if($('.darkness-container').length)
         $('.darkness-container').remove();
      $('body').append(element);

      object.emit('spawnstart');
      element.animate({opacity:1}, 250, 'swing', function(){
         object.emit('spawnend');
      });
   };

   this.fade = function() {
      object.emit('fadestart');
      element.animate({opacity:0}, 200, 'swing', function(){
         element.remove();
         object.emit('fadeend');
      });
   };

   element.click(function(e){
      object.emit('click', e);
   });

};

za.ui.Darkness.prototype = EventEmitter2.prototype;
