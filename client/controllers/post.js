/* global za, clientData */

za.controllers.post = new za.Controller(function(element){

   setTimeout(function update(){
      var dateElement = $(element).find('.post-date-published');
      var text = dateElement.find('.text');
      var number = dateElement.find('.number');
      var timestamp = $(element).attr('data-date_published');

      var dif = Date.now() - +timestamp;

      dif /= 1e3;

      if(dif < 120)
         return set('just_now');

      dif /= 60;

      if(dif < 60)
         return set('minutes_ago', dif);

      dif /= 60;

      if(dif < 48)
         return set('hours_ago', dif);

      dif /= 24;

      if(dif < 14)
         return set('days_ago', dif);

      set('weeks_ago', dif);

      function set(textId, dif){
         dif = Math.floor(dif);
         number.html(dif ? dif : '');
         text.attr('data-html-' + textId, 1).html(clientData.core_text[textId]);

         // If element is still in document, update time in a minute
         if($('html').find(element).length)
            setTimeout(update, 6e4);
      }
   },0);

});
