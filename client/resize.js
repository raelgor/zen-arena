function resize(event){
    
    // Fix carousel
    $('.carousel').css({
        height: window.innerWidth*.51 - 50 + 'px',
        lineHeight: window.innerWidth*.51 - 50 + 'px',
        maxHeight: window.innerHeight + 'px'
    });
    
    // Translate fix
    var ho = window.innerHeight*.95 < 507 ? window.innerHeight*.95/2 : 254; 
    $('.auth-dialogs > *').css({
        top: window.innerHeight/2 - ho + 'px',
        left: window.innerWidth/2 - 170 + 'px'
    });
    
}

$(window).resize(resize).ready(resize);