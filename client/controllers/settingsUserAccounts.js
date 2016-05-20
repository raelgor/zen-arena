za.controllers.settingsUserAccounts = new za.Controller(function(element){

   $(element).find('button.bnet').click(function(){
      window.bnet = window.open('/api/battlenet/auth', 'lol', 'width=200,height=100');
   });

});
