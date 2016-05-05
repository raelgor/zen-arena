za.ui.CenteredWindow = function(options){

      var element = $('<div>');
      var object = this;
      var DISPOSED;

      var fields = options.fields.split(/[ ]+/);

      element
      .css('opacity', 0)
      .addClass('white-box')
      .addClass('centered-window');

      fields.forEach(function(field){
         element.append('<div data-field-id="'+field+'"></div>');
      });

      // Updates fields with content
      this.updateField = function(fieldId, content){
         element.find('[data-field-id="'+fieldId+'"]').html(content);
         object.emit('change');
      };

      this.spawn = function() {
         $('body').append(element);
         window.addEventListener('resize', object.position);
         object.emit('spawnstart');
         object.position();
         element.animate({
            opacity:1,
            transform: 'scale(1)'
         }, 400, 'swing', function(){
            object.emit('spawnend');
         });
      };

      // Animates to the correct position
      this.position = function(){
         element.stop().animate({
            top: window.innerHeight/2 - element.outerHeight()/2,
            left: window.innerWidth/2 - element.outerWidth()/2
         }, 300, 'swing');
      };

      this.dispose = function(){
         if(DISPOSED)
            return;
         DISPOSED = true;
         object.emit('disposed');
         element.stop().animate({
            opacity:0,
            transform: 'scale(0)'
         }, 300, 'swing', function(){
            window.removeEventListener('resize', object.position);
            element.remove();
         });
      };

      // Reposition on content changes
      this.on('change', this.position);

      if(options.cancelable) {
         var emitter = new za.ui.Disposable(element);
         emitter.on('disposed', this.dispose);
      }

};

za.ui.CenteredWindow.prototype = EventEmitter2.prototype;
