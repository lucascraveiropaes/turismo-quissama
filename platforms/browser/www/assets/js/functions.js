$('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true //, // Choose whether you can drag to open on touch screens,
        //onOpen: function(el) { /* Do Stuff */ }, 
        //onClose: function(el) { /* Do Stuff */ },
  	}
);

$(document).ready(function(){
  	$('#play').click( function(){
  		$('#play').toggle(".hide");
  	});

  	$('#pause').click( function(){
  		$('#play').toggle(".show");
  	});

  	$('.button-search').click( function(){
  		$('#search-bar').addClass("search-show");
  		$('.button-search').toggle(".hide");
  		$('.button-collapse').toggle(".hide");

  		setTimeout(function(){
  			$('#search-input').focus();
  		}, 100);
		
  	});

  	$('#search-input').focusout( function() {
		$('#search-bar').removeClass("search-show");
  		$('.button-search').toggle(".hide");
  		$('.button-collapse').toggle(".hide");
  	});

	$('.carousel').carousel();
});

/* Transição Entre Páginas */
$(document).ready(function() { 
    $("body").fadeIn(500);
 
    $("a.transition").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        $("body").fadeOut(500, redirectPage);      
    });
         
    function redirectPage() {
        window.location = linkLocation;
    }
});

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}

$(document).on('scroll', function () {
    if ( $( "nav" ).hasClass( "navbar-image" ) ) {
        var sH = $('.section-top').height();
        var $menu = $('nav.navbar-image');
        
        if ( ( sH - ($menu.height()+56) ) <= $(window).scrollTop() ) {
            var bgURI = $('#section-card-bg').attr('src');
            $('nav').removeClass("transparent");
            $('nav').addClass("background-menu");
            $('nav').css('background-image', 'url(' + bgURI + ')');
        } else {
            $('nav').addClass("transparent");
            $('nav').removeClass("background-menu");
            $('nav').css('background-image', 'none');     
        }
    }
});
