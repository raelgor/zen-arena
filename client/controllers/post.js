/* global za, clientData */

za.controllers.post = new za.Controller(function(element){

   var postId = $(element).attr('data-post-id');
   var totalComments = +$(element).find('.comment .post-interaction-pool').html()||0;

   var comIndex = totalComments-3>=0?totalComments-3:0;

   if(comIndex===0)
      $(element).find('.load-more').hide();

   $(element).find('.load-more').click(function(){

      $(this).css({opacity:0.4,pointerEvents:'none'});
      za.send('/api/comment/getprevious/'+postId+'/'+comIndex).success(function(r){

         $(element).find('.comment-pool').prepend(r.data.commentHtml);
         trackCommentLike();
         refreshDates();
         if((comIndex-=10) < 0)
            $(element).find('.load-more').hide();


      }).always(function(){$(element).find('.load-more').css({opacity:1,pointerEvents:'all'});});


   });

   $(element).find('.like').click(function(){

      if(!clientData.user_data)
         return za.login.promptLogin();

      var action = $(this).is('.liked') ? 'remove' : 'add';

      za.send('/api/like/' + action + '/post/' + postId);

      var likes = +$(this).find('.post-interaction-pool').html();

      $(this).find('.post-interaction-pool').html(+($(this).is('.liked')?--likes:++likes)||'');

      $(this).toggleClass('liked');

   });

   $(element).find('.comment').click(function(){
      if(!clientData.user_data)
         return za.login.promptLogin();
      else
         $(element).find('.user-comment input').focus();
   });

   $(element).find('.user-comment').submit(function(e){
      var comment = $(element).find('.user-comment input.comment-text').val();

      $(element).find('.user-comment input.comment-text').val('');

      za.send('/api/comment/create/'+postId, {comment:comment})
      .success(function(response){
         $(element).find('.comment-pool').append(response.data.commentHtml);
         refreshDates();
         trackCommentLike();
         $(element).find('.comment .post-interaction-pool').html(+$(element).find('.comment .post-interaction-pool').html()+1);
      });

      e.preventDefault();
      e.stopPropagation();
   });

   if(clientData.user_data) {
      $(element).find('.user-comment .comment-user-image')
                .css('background-image', 'url('+ clientData.user_data.image +')');
   }

   var dateRefresher = setTimeout(update,0);

   function trackCommentLike(){
      var targets = $(element).find('.comment-container:not(.like-tracked)');

      targets.each(function(i, e){

         $(e).find('.comment-like').click(function(){
            if(!clientData.user_data)
               return za.login.promptLogin();
            var comId = $(this).parents('.comment-container').attr('data-comment-id');
            var action = $(this).is('.liked') ? 'remove' : 'add';
            var currentLikes = +$(this).find('.comment-interaction-pool').html() || 0;
            za.send('/api/like/' + action + '/comment/' + comId);
            $(this).find('.comment-interaction-pool').html((+currentLikes+(action=='add'?1:-1))||'');
            $(this).toggleClass('liked');
         });

      });

      targets.addClass('like-tracked');
   }

   trackCommentLike();

   function update(){
      var dateElement = $(element).find('[data-date]');

      dateElement.each(make_date);

      function make_date(i, dateElement){
         dateElement = $(dateElement);
         var text = dateElement.find('.date-text');
         var number = dateElement.find('.date-number');
         var timestamp = dateElement.attr('data-date');

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

            // Reset
            ['just_now', 'minutes_ago', 'hours_ago', 'days_ago', 'weeks_ago']
            .forEach(function(a){ text.removeAttr('data-html-'+a); });

            text.attr('data-html-' + textId, 1).html(clientData.core_text[textId]);
         }

      }

      // If element is still in document, update time in a minute
      if($('html').find(element).length)
         dateRefresher = setTimeout(update, 6e4);

   }

   function refreshDates() {
      clearTimeout(dateRefresher);
      update();
   }

});
