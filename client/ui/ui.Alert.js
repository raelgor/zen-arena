/*

Options:
   title: Window title core text id
   message: Window message core text id
   cancelable: Boolean about whether the window can be disposed or not

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

   centeredWindow.updateField('title', clientData.core_text[options.title]);
   centeredWindow.updateField('description', clientData.core_text[options.message]);

   centeredWindow.updateField('buttons', dialogButtons.element);

   this.spawn = function(){
      darkness.spawn();
      centeredWindow.spawn();
      dialogButtons.focus('ok');
      return object;
   };

   this.fade = function(){
      darkness.hide();
      centeredWindow.dispose();
      return object;
   };

   this.dispose = function(){
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
