za.controllers.settingsUserPassword = new za.Controller(function(element){

   $(element).find('button.submit').click(function(){

      var new_password = $(element).find('.prop-input.np').val();
      var new_password_repeat = $(element).find('.prop-input.np2').val();
      var current_password = $(element).find('.prop-input.cp').val();

      if(!new_password)
         return;

      if(new_password !== new_password_repeat)
         return $(element).find('.error').html(za.txt('error_passwords_must_match'));

      $(element).find('.np,.np2,.cp').val('');

      za.send('/api/settings/user/password', {
         new_password: new_password,
         current_password: current_password
      })
      .success(function(response){
         console.log(response);
      });

   });

});
