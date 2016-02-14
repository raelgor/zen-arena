/* global za, clientData, $ */
za.__ruid = 0;
za.send = function(dest, object){

    var message = {
        rid: ++za.__ruid,
        message: object,
        csrf_token: clientData.csrf_token
    };

    return $.post(dest, message);

};
