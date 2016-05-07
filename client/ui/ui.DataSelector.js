/*

Options:
   title: Window title core text id.
   message: Window message core text id.

   search: Boolean about whether or not data options are searchable.
   searchPlaceholder: Search field's placeholder core text id.

   buffered: Boolean whether or not to query for more data on scroll down
      if dataSource is a url.

   multiSelect: Boolean whether or not it is possible to select multiple rows.

   image: The key that contains an image path to display on the left of the row.

   cancelable: Boolean about whether the window can be disposed or not.
   dataSource: Array of data or string of api url to fetch them. Takes in
      $q if searchable and $i if multipart.

   selection: Array of objects who's key/value pairs, if matched by any row,
      will make that row selected.

*/
za.ui.DataSelector = function(options){

   var NO_RESULTS = '<div class="data-selector-no-results" data-html-no_results>'+clientData.core_text.no_results+'</div>';

   options = typeof options === 'object' ? options : {};
   var cancelable = 'cancelable' in options ? options.cancelable : true;

   var title = 'title' in options ? options.title : '';
   var message = 'message' in options ? options.message : '';

   title = clientData.core_text[title];
   message = clientData.core_text[message];

   var object = this;
   var darkness = new za.ui.Darkness();
   var dialogButtons = new za.ui.DialogButtons([
      { id: 'no', text: 'cancel' },
      { id: 'yes', text: 'ok' },
   ]);
   var centeredWindow = new za.ui.CenteredWindow({
      fields: 'title description search pool buttons',
      cancelable: true,
      disposable: false
   });

   var $i = 0;
   var $q = '';

   var lastCall;
   var dry;

   if(options.title)
      centeredWindow.updateField('title', title);

   if(options.message)
      centeredWindow.updateField('description', message);

   if(options.search) {
      var searchElement = $('<input>');

      options.searchPlaceholder = options.searchPlaceholder || 'search';

      searchElement
         .addClass('selector-search-field')
         .attr('data-placeholder-'+options.searchPlaceholder, 1)
         .attr('placeholder', clientData.core_text[options.searchPlaceholder]);

      searchElement.keyup(function(e){
         var keycode = e.keyCode;

         (
            keycode === 8 ||
         (keycode > 47 && keycode < 58) ||
         (keycode > 64 && keycode < 91) ||
         (keycode > 95 && keycode < 112)
         ) &&
         updatePool(e);

         if(~[40].indexOf(keycode))
            pool.find('.selector-pool-row:first-child .za-checkbox').focus();

      });

      centeredWindow.updateField('search', searchElement);
   }

   function updatePool(){
      lastCall && lastCall.abort();
      $q = centeredWindow.element.find('input.selector-search-field').val();
      dry = false;

      if(typeof options.dataSource === 'string') {
         pool.html('');
         lastCall =
            za
            .send(options.dataSource.replace(/\$i/, $i).replace(/\$q/, encodeURIComponent($q)))
            .success(function(response){
               if(response.data.data.length){
                  appendFromRowArray(response.data.data);
               } else {
                  dry = true;
                  pool.append(NO_RESULTS);
               }
            });
      } else if(typeof options.dataSource === 'function') {

         options.dataSource($q, $i, function(results){
            pool.html('');
            results.length ?
            appendFromRowArray(results) :
            pool.append(NO_RESULTS);
         });

      } else {

         var candidates = pool.find('.selector-pool-row .za-checkbox-text');
         var matches = 0;

         pool.find('.data-selector-no-results').remove();

         candidates.each(function(i,e){

            if(new RegExp($q, 'i').test($(e).text())) {
               matches++;
               $(e).parents('.selector-pool-row').show();
            } else
               $(e).parents('.selector-pool-row').hide();
         });

         !matches &&
         pool.append(NO_RESULTS);

      }
   }

   function Row(row) {
      var element = this.element = $('<div>');
      var rowTitle = typeof options.rowTitle === 'function' ? options.rowTitle(row) : row[options.rowTitle];

      if(options.image)
         rowTitle = '<img src="'+row[options.image]+'" style="width: 26px" />' + rowTitle;

      var checkbox =
         this.checkbox =
            new za.ui.Checkbox(rowTitle, {}, false, 'light');

      checkbox.on('focus', function(){ element.addClass('focus'); });
      checkbox.on('blur', function(){ element.removeClass('focus'); });

      checkbox.element.keydown(function(e){

         if(~[38,40].indexOf(e.keyCode)) {

            element[e.keyCode==38?'prev':'next']('.selector-pool-row')
               .find('.za-checkbox')
               .focus();

            e.preventDefault();
            e.stopPropagation();

            return false;

         }

      });

      element.click(function(e){
         $(e.target).is(':not(.za-checkbox,.za-checkbox *)') &&
         element.find('.za-checkbox').click();
      });

      options.selection && options.selection.forEach(function(s){
         Object.keys(s).forEach(function(k){
            row[k] == s[k] &&
            checkbox.check();
         });
      });

      element
      .addClass('selector-pool-row')
      .html(checkbox.element);
   }

   function appendFromRowArray(array) {
      array.forEach(function(row){
         var entry = new Row(row);
         var checkbox = entry.checkbox;

         checkbox.on('checked', function(){
            if(!options.multiSelect) {
               checkbox
                  .element
                  .parents('.selector-pool-row')
                  .siblings('.selector-pool-row:has(.za-checkbox.checked)')
                  .find('.za-checkbox.checked')
                  .removeClass('checked');

               object.emit('new', row);
               object.dispose();
            }
         });

         pool.append(entry.element);
      });
   }

   var pool = $('<div>');

   pool
      .addClass('data-selector-pool');

   centeredWindow.updateField('pool', pool);

   centeredWindow.updateField('buttons', dialogButtons.element);

   this.spawn = function(){
      darkness.spawn();
      centeredWindow.spawn();
      dialogButtons.focus('yes');
      if(searchElement)
         za.ui.ntFocus(searchElement);
      if(options.dataSource instanceof Array)
         appendFromRowArray(options.dataSource);
      else if(~['function','string'].indexOf(typeof options.dataSource))
         updatePool();
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
      // @todo Emit data
      object.dispose();

   });

   this.darkness = darkness;
   this.window = centeredWindow;

};

za.ui.DataSelector.prototype = EventEmitter2.prototype;
