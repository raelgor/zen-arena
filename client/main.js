window.za = {
    
    ui: {}
    
}

$(window).ready(function(){
    
    !Boolean(window.touchstart) && $('.navigation .search').focus();
    
});