za.ui.Alert = function(options){

   var cancelable = options.cancelable;

   var object = this;
   var darkness = new za.ui.Darkness();
   //var dialogButtons = new za.ui.DialogButtons([{ ok: 'ok' }]);
   var centeredWindow = new za.ui.CenteredWindow({
      fields: 'title description buttons',
      cancelable: true
   });

   centeredWindow.updateField('title', clientData.core_text[options.title]);
   centeredWindow.updateField('description', clientData.core_text[options.message]);

   //centeredWindow.updateField('buttons', dialogButtons.element);

   this.spawn = function(){
      darkness.spawn();
      centeredWindow.spawn();
   };

   this.fade = function(){
      darkness.hide();
      centeredWindow.dispose();
   };

   this.dispose = function(){
      object.emit('disposed');
      darkness.fade();
      centeredWindow.dispose();
   };

   if(cancelable)
      darkness.on('click', this.dispose);

   centeredWindow.on('disposed', this.dispose);
   //dialogButtons.on('submit', this.dispose);

   this.darkness = darkness;
   this.window = centeredWindow;

};

za.ui.Alert.prototype = EventEmitter2.prototype;
