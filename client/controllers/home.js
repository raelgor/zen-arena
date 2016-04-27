/* global za */

za.controllers.home = new za.Controller(function(element){

   $(element).find('#stepinarena').click(function(){
      za.login.promptLogin(function(){
         za.goToStateByUrl('/');
      });
   });

});
