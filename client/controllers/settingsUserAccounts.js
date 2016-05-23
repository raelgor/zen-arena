za.controllers.settingsUserAccounts = new za.Controller(function(element){

   $(element).find('.dc').click(function(){
      var accEl = $(this).parents('[data-option-id]');
      var subject = $(this).parents('[data-option-id]').attr('data-option-id');
      new za.ui.Confirm({
         title: 'are_you_sure',
         message: 'oauth_unlink_warning'
      })
      .spawn()
      .on('yes', function(){
         var loader = new za.ui.Loader();
         loader.find('.sk-cube-grid').css('margin', '0px');
         loader.loaderify(accEl);
         za.send('/api/oauth/unlink/' + subject).always(function(){
            $(accEl).find('.connected').hide();
            $(accEl).find('.not-connected').show();
            $(accEl).find('.acc-id').html('<span data-html-not_connected>'+clientData.core_text.not_connected+'</span>');
            loader.unloaderify();
         });
      });
   });

   $(element).find('[data-option-id="bnet"] button').click(function(){
      if(/chrome|crios/i.test(navigator.userAgent) && za._touch)
         window.location.href = '/api/oauth/link/battlenet';
      else
         window.bnet =
            window.open('/api/oauth/link/battlenet',
                        'Battle.net Authentication',
                        'width=400,height=400');

      window.removeEventListener('message', bnetCodeListener);
      window.addEventListener('message', bnetCodeListener);
   });

   function bnetCodeListener(msg) {
      try {
         msg = JSON.parse(msg.data);
      } catch(err) { }

      if(!msg.battletag)
         return;

      $('[data-option-id="bnet"]').find('.acc-id').html('<span>'+msg.battletag+'</span>');

      $('[data-option-id="bnet"]').find('.connected').show();
      $('[data-option-id="bnet"]').find('.not-connected').hide();

      window.removeEventListener('message', bnetCodeListener);
   }

   $(element).find('[data-option-id="fb"] button').click(function(){

      var token = FB.getAccessToken();
      var permission_scope = 'public_profile,user_friends,email';

      if(token)
         za.send('/api/oauth/link/fb', {access_token: token})
         .success(fbLinkSuccessHandler);
      else {
         if(/chrome|crios/i.test(navigator.userAgent) && za._touch) {
            window.location.href =
               'https://www.facebook.com/dialog/oauth?client_id=' + clientData.fb_app_id +
               '&redirect_uri=' + window.location.href +
               '&scope=' + permission_scope;
         }
         else FB.login(function(response){
            if(!response.authResponse)
               console.log(response);
            else za.send('/api/oauth/link/fb', {access_token: response.authResponse.accessToken})
            .success(fbLinkSuccessHandler);
         }, {
            scope: permission_scope
         });
      }

   });

   za.gapi_ready.then(function(){
      za.attachGoogleSignin($(element).find('[data-option-id="gplus"] button')[0],
         function(response){
            response.hg.access_token &&
            za.send('/api/oauth/link/gplus', { access_token: response.hg.access_token })
            .success(function(response){
               $('[data-option-id="gplus"]').find('.acc-id')
                  .html('<span>'+response.data.name+'</span>');
               $('[data-option-id="gplus"]').find('.connected').show();
               $('[data-option-id="gplus"]').find('.not-connected').hide();
            });
         },
         function(){}
      );
   });

   function fbLinkSuccessHandler(response) {
      $('[data-option-id="fb"]').find('.acc-id')
         .html('<span>'+response.data.name+'</span>');
      $('[data-option-id="fb"]').find('.connected').show();
      $('[data-option-id="fb"]').find('.not-connected').hide();
   }

});
