/*

Options:
   title: Window title core text id
   message: Window message core text id
   cancelable: Boolean about whether the window can be disposed or not

*/
za.ui.Confirm = function(options){

   options = typeof options === 'object' ? options : {};
   var cancelable = 'cancelable' in options ? options.cancelable : true;

   var title = 'title' in options ? options.title : 'confirm';
   var message = 'message' in options ? options.message : 'are_you_sure';

   title = clientData.core_text[title];
   message = clientData.core_text[message];

   var object = this;
   var darkness = new za.ui.Darkness();
   var dialogButtons = new za.ui.DialogButtons([
      { id: 'no', text: 'cancel' },
      { id: 'yes', text: 'ok' },
   ]);
   var centeredWindow = new za.ui.CenteredWindow({
      fields: 'title description buttons',
      cancelable: true
   });

   centeredWindow.updateField('title', title);
   centeredWindow.updateField('description', message);

   centeredWindow.updateField('buttons', dialogButtons.element);

   this.spawn = function(){
      darkness.spawn();
      centeredWindow.spawn();
      dialogButtons.focus('yes');
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
   dialogButtons.on('click', function(option){

      object.emit(option.id);
      object.dispose();

   });

   this.darkness = darkness;
   this.window = centeredWindow;

};

za.ui.Confirm.prototype = EventEmitter2.prototype;
