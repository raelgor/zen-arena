/* global za */

za.controllers.home = new za.Controller(function(element){

   $(element).find('#stepinarena').click(za.login.promptLogin);

});
