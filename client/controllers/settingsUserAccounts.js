window.addEventListener('message', bnetCodeListener);

function bnetCodeListener(msg) {
   if(!/^bnc:/.test(msg.data)) return;
   else console.log(msg);
}

za.controllers.settingsUserAccounts = new za.Controller(function(element){

   $(element).find('button.bnet').click(function(){
      if(/chrome|crios/i.test(navigator.userAgent) && za._touch)
         window.location.href = '/api/battlenet/auth';
      else
         window.bnet = window.open('/api/battlenet/auth', 'Battle.net Authentication', 'width=400,height=400');
   });

});
