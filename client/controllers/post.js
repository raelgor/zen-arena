za.controllers.post = new za.Controller(function(element){

   var postId = $(element).attr('data-post-id');
   var totalComments = +$(element).find('.comment .post-interaction-pool').html()||0;

   var comIndex = totalComments-3>=0?totalComments-3:0;

   if(totalComments<=2)
      $(element).find('.load-more').hide();

   $(element).click(function(e){
      if($(e.target).is('.comment-container .icon-cross')){
         var comment = $(e.target).parents('.comment-container');
         var commentId = comment.attr('data-comment-id');
         za.send('/api/comment/delete/'+commentId).success(function(response){
            if(response.data.message != 'OK') return;
            comment.css('overflow','hidden');
            comment.animate({
               height: '0px',
               paddingTop: '0px',
               paddingBottom: '0px',
               marginTop: '0px',
               marginBottom: '0px',
               opacity: 0
            }, 400, 'swing', function(){
               comment.remove();
               $(element).find('.comment .post-interaction-pool').html(+$(element).find('.comment .post-interaction-pool').html()-1);
            });
         });
      }
      if($(e.target).is('.icon-cross.post')){
         za.send('/api/post/delete/'+postId).success(function(response){
            if(response.data.message != 'OK') return;
            $(element)
            .css('overflow','hidden')
            .animate({
               height: '0px',
               paddingTop: '0px',
               paddingBottom: '0px',
               marginTop: '0px',
               marginBottom: '0px',
               opacity: 0
            }, 400, 'swing', function(){
               $(element).remove();
            });
         });
      }
   });

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

      var btn = $(this);
      if(!clientData.user_data)
         return za.login.promptLogin(function(){
            btn.click();
         });

      var action = $(this).is('.liked') ? 'remove' : 'add';

      za.send('/api/like/' + action + '/post/' + postId);

      var likes = +$(this).find('.post-interaction-pool').html();

      $(this).find('.post-interaction-pool').html(+($(this).is('.liked')?--likes:++likes)||'');

      $(this).toggleClass('liked');

   });

   $(element).find('.comment').click(function(){
      var btn = $(this);
      if(!clientData.user_data)
         return za.login.promptLogin(function(){
            btn.click();
         });
      else
         $(element).find('.user-comment input').focus();
   });

   $(element).find('.user-comment').submit(function(e){
      e.preventDefault();
      e.stopPropagation();

      var comment = $(element).find('.user-comment input.comment-text').val();
      if(!comment) return;

      $(element).find('.user-comment input.comment-text').val('');

      za.send('/api/comment/create/'+postId, {comment:comment})
      .success(function(response){
         $(element).find('.comment-pool').append(response.data.commentHtml);

         var scrollDown = $(element).find('.comment-pool > :last-child').height()+11;
         var currentScrollTop = $('html').scrollTop() || $('body').scrollTop();

         if($(element).find('input.comment-text').offset().top > currentScrollTop + window.innerHeight - 100)
         $('html,body').scrollTop(currentScrollTop + scrollDown);

         refreshDates();
         trackCommentLike();
         $(element).find('.comment .post-interaction-pool').html(+$(element).find('.comment .post-interaction-pool').html()+1);
      });
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
            var btn = $(this);
            if(!clientData.user_data)
               return za.login.promptLogin(function(){
                  btn.click();
               });
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

         dif /= 7;

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
