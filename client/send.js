za.__ruid = 0;
za.send = function(dest, object){
    
    var message = {
        rid: ++za.__ruid,
        message: object
    };
    
    return $.post(dest, message);
    
}