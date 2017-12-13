var sH = $('.section-top').height();
var $menu = $('nav');

$(document).on('scroll', function () {
    if ( ( sH - $menu.height() ) <= $(window).scrollTop() ) {
    	var bgURI = $('#section-card-bg').attr('src');
    	$('nav').removeClass("transparent");
    	$('nav').addClass("background-menu");
    	$('nav').css('background-image', 'url(' + bgURI + ')');
    } else {
    	$('nav').addClass("transparent");
    	$('nav').removeClass("background-menu");
    	$('nav').css('background-image', 'none');    	
    }
});
