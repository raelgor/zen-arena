/**
 * Creates a centered window with controlled content size that strives to stay
 * in the middle of the screen.
 * @class za.ui.CenteredWindow
 * @param {Object}  options
 * @param {String}  [options.fields=''] Space separated list of field
 * names to be used as Ids for controlled content changes.
 * @param {Boolean} [options.disposable=true] Whether the window inherits the
 * {@link za.ui.Disposable} class.
 * @param {Boolean} [options.cancelable=true] Whether the window can be
 * dismissed by interaction.
 */
za.ui.CenteredWindow = function(options){

      var element = this.element = $('<div>');
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

      /**
       * Updates fields with content and emits a `change` event that triggers
       * the repositioning of the window.
       * @method za.ui.CenteredWindow.updateField
       * @emits za.CenteredWindow#change
       */
      this.updateField = function(fieldId, content){
         element.find('[data-field-id="'+fieldId+'"]').html(content);

         /**
          * Window contents and their size have probably changed.
          * @event za.ui.CenteredWindow#change
          */
         object.emit('change');
      };

      /**
       * Animates the window into existence.
       * @method za.ui.CenteredWindow.spawn
       */
      this.spawn = function() {
         $('body').append(element);
         $(window).bind('resize', object.position);
         $(window).bind('keydown', escapeListener);
         object.position();
         element.animate({
            opacity:1,
            transform: 'scale(1)'
         }, 200, 'swing');
      };

      function escapeListener(e) {
         e.keyCode === 27 &&
         $(':focus').is(':not(input, textarea)') &&
         object.dispose();
      }

      /**
       * Animates to the correct position.
       * @method za.ui.CenteredWindow.position
       */
      this.position = function(){
         element.stop().animate({
            top: window.innerHeight/2 - element.outerHeight()/2,
            left: window.innerWidth/2 - element.outerWidth()/2
         }, 200, 'swing');
      };

      /**
       * Disposes the window and emits `disposed`.
       * @method za.ui.CenteredWindow.dispose
       * @emits za.CenteredWindow#disposed
       */
      this.dispose = function(){
         if(DISPOSED)
            return;
         $(window).unbind('keydown', escapeListener);
         DISPOSED = true;

         /**
          * The window has been dismissed.
          * @event za.ui.CenteredWindow#disposed
          */
         object.emit('disposed');

         element.stop().animate({
            opacity:0,
            transform: 'scale(0)'
         }, 200, 'swing', function(){
            $(window).unbind('resize', object.position);
            element.remove();
         });
      };

      // Reposition on content changes
      this.on('change', this.position);

      if(options.cancelable && options.disposable !== false) {
         var emitter = new za.ui.Disposable(element);
         emitter.on('disposed', this.dispose);
      }

};

za.ui.CenteredWindow.prototype = EventEmitter2.prototype;
