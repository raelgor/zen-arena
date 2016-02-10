function resize(event){
    
    // Fix carousel
    $('.carousel').css({
        height: window.innerWidth*.51 + 'px',
        maxHeight: window.innerHeight + 'px'
    });
    
}

$(window).resize(resize);