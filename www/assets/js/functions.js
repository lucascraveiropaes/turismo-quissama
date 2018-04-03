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

$(function(){
    var includes = $('[data-include]');

    jQuery.each(includes, function(){
        var file = $(this).data('include');
        $(this).load(file);
    });
});

$.fn.GetURLParameter = function( sParam ){
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) { 
            return decodeURIComponent(sParameterName[1]);
        }
    }
}

function loader() {
    return  '<div class="col s12">' +
                '<div class="preloader-wrapper big active">' +
                    '<div class="spinner-layer spinner-green-only">' +
                        '<div class="circle-clipper left">' +
                            '<div class="circle"></div>' +
                        '</div><div class="gap-patch">' +
                            '<div class="circle"></div>' +
                        '</div><div class="circle-clipper right">' +
                            '<div class="circle"></div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
}

function convertDate(date) {
    var day = date.split("-")[0];
    var month = date.split("-")[1];
    var year = date.split("-")[2];

    return month+"/"+day+"/"+year;
}

function formatDate(date1 = "", date2 = "") {
    var jsDate1 = new Date(convertDate(date1));
    var day1 = jsDate1.getDate();
    var month1 = (jsDate1.getMonth()+1);
    var year1 = jsDate1.getFullYear();

    var jsDate2 = new Date(convertDate(date2));
    var day2 = jsDate2.getDate();
    var month2 = (jsDate2.getMonth()+1);
    var year2 = jsDate2.getFullYear();


    console.log(day1, day2);
    console.log(month1, month2);
    console.log(year1, year2);

    var response = "Nos dias "+ day1 +"/"+month1+" até "+ day2 +"/"+month2+" de "+year1;

    if (year1 == year2) {
        if (month1 == month2) {
            if (day1 === day2) {
                response = day1+"/"+month1+"/"+year1;
            }
            else {
                response = "Nos dias "+ day1 +" até "+ day2 +" do mês "+month2+" de "+year1;
            }
        }
    }
    else{
        response = jsDate1.toLocaleDateString() + " até " + jsDate2.toLocaleDateString();
    }

    return response;
}