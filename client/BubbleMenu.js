/* global za, clientData */
za.ui.BubbleMenu = function(options){

   var object = this;
   var el = this._element = $('<div>');

   el
   .addClass('bubble-menu')
   .attr('tabindex', 0)
   .css({
      opacity: 0,
      top: options.top + 'px',
      left: options.left + 'px'
   });

   options.options.forEach(function(option){
      var option_element = $('<a>');

      option_element.click(function(){
         object.remove();

         if(typeof option.callback === 'function')
            option.callback();
      });

      option_element
      .html(option.text)
      .attr('href', option.href)
      .attr('tabindex', 0);

      el.append(option_element);
   });

   this._listener = function listener(event){
      if($(event.target).is(':not(.bubble-menu):not(.bubble-menu *)'))
         object.remove();
   };

   setTimeout(function(){ window.addEventListener('click', object._listener); }, 0);
   setTimeout(function(){ window.addEventListener('touchend', object._listener); }, 0);

   $('body').append(this._element);
   this._element.find('a:first-child');
   this._element.focus();

   this._element.animate({opacity:1}, 200, 'swing');

   var reach = this._element.width() + this._element.offset().left;

   if(reach > window.innerWidth)
      this._element.css('left', this._element.offset().left - (reach - window.innerWidth + 3) + 'px');

};

za.ui.BubbleMenu.prototype.remove = function(){
   window.removeEventListener('click', this._listener);
   window.removeEventListener('touchend', this._listener);
   this._element
   .css('pointer-events', 'none')
   .animate({opacity:0},200,'swing',function(){
      $(this).remove();
   });
};

za.ui.spawnUserBubbleMenu = function(options) {

   new za.ui.BubbleMenu({
      top: options.top,
      left: options.left,
      options: [
         { text: clientData.core_text.profile, href: '/' + clientData.user_data.id },
         { text: clientData.core_text.settings, href: '/settings' },
         { text: clientData.core_text.logout, href: '/api/logout' }
      ]
   });

};
