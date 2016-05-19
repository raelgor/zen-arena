/**
 * Creates an alert window of the class {@link za.ui.CenteredWindow} and a
 * background {@link za.ui.Darkness}.
 * @class za.ui.Alert
 * @param {Object}  options
 * @param {String}  [options.title='']        Text Id of the window's title.
 * @param {String}  [options.message='']      Text Id of the window's message.
 * @param {Boolean} [options.cancelable=true] Whether the window can be
 * dismissed by interaction.
 */
za.ui.Alert = function(options){

   options = typeof options === 'object' ? options : {};
   var cancelable = 'cancelable' in options ? options.cancelable : true;

   var title = 'title' in options ? options.title : '';
   var message = 'message' in options ? options.message : '';

   title = clientData.core_text[title];
   message = clientData.core_text[message];

   var object = this;
   var darkness = new za.ui.Darkness();
   var dialogButtons = new za.ui.DialogButtons([{ id: 'ok', text: 'ok' }]);
   var centeredWindow = new za.ui.CenteredWindow({
      fields: 'title description buttons',
      cancelable: true
   });

   centeredWindow.updateField('title', title);
   centeredWindow.updateField('description', message);

   centeredWindow.updateField('buttons', dialogButtons.element);

   /**
    * Animates the window into existence.
    * @method za.ui.Alert.spawn
    * @returns {za.ui.Alert}
    */
   this.spawn = function(){
      darkness.spawn();
      centeredWindow.spawn();
      dialogButtons.focus('ok');
      return object;
   };

   /**
    * Hides the window with a smooth animation.
    * @method za.ui.Alert.fade
    * @returns {za.ui.Alert}
    */
   this.fade = function(){
      darkness.hide();
      centeredWindow.dispose();
      return object;
   };

   /**
    * Emits `disposed` and calls `fade`.
    * @method za.ui.Alert.dispose
    * @emits za.ui.Alert#disposed
    * @returns {za.ui.Alert}
    */
   this.dispose = function(){

      /**
       * The window is disposed.
       * @event za.ui.Alert#disposed
       * @type {Object}
       */
      object.emit('disposed');

      darkness.fade();
      centeredWindow.dispose();
      return object;

   };

   if(cancelable)
      darkness.on('click', this.dispose);

   centeredWindow.on('disposed', this.dispose);
   dialogButtons.on('click', this.dispose);

   this.darkness = darkness;
   this.window = centeredWindow;

};

za.ui.Alert.prototype = EventEmitter2.prototype;
