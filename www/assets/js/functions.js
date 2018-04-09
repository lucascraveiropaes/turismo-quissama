// Constante usada em todo app com a url base que aponta para o servidor
const baseURI = "https://turismo-quissama.000webhostapp.com/";

$(document).ready(function(){
    $('.main').prepend('<div id="search-result"></div>');
    $('#search-result').append('<div class="loader-container">'+ loader() + '</div>');
    $('#search-result').hide();

    $("#search-input").on("change paste keyup", function() {
    	clearTimeout("search");

        var query = $(this).val();
        $('#content').hide();
        $('#search-result').show();

        setTimeout(function(){ search(query) }, 1500);
    });

    $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true
  	});

  	$('.button-search').click( function(){
  		$('#search-bar').addClass("search-show");
  		$('.button-search').toggle(".hide");
  		$('.button-collapse').toggle(".hide");
  		$('.menu-link').toggle(".hide");

  		setTimeout(function(){
  			$('#search-input').focus();
  		}, 100);

  	});

  	$('#close-search').click( function() {
        $('#content').show();
		$('#search-bar').removeClass("search-show");
  		$('.button-search').toggle(".hide");
  		$('.button-collapse').toggle(".hide");
        $("#search-input").val("");
        $('#search-result').hide();
  	});
});

function search(query) {
    $.ajax({
        method: "GET",
        url: "https://turismo-quissama.000webhostapp.com/search/"+query,
    }).done(function( data ) {
        var html = "";
        var baseUrl = document.getElementById('main').getAttribute('data-url');
        var colors = generateColors();

        for (var i = 0; i < data.length; i++) {
            var imagem = data[i].imagem;
            var category = data[i].category;
            var bg = "";

            if (imagem == "") {
                imagem = baseUrl+"../assets/img/default.jpg";
            }
            imagem = '<div class="result-item-image" style="background-image: url('+imagem+')"></div>';

            var link = baseUrl+"single.html?id="+data[i].id;
            if (category == "Evento") {
                bg = 'style="background: #00877e"';
                link = link = baseUrl+"single.html?category=eventos&id="+data[i].id;
            }
            else if (category == "Agenda") {
                bg = 'style="background: #103146"';
                var letter = data[i].nome.substr(0, 1);

                link = baseUrl+"agenda/lista.html?#"+ data[i].id;
                imagem = '<div class="result-item-image" style="background: '+ colors[letter.toLowerCase()].background +'"><h3 style="color: '+colors[letter.toLowerCase()].color+'">'+ letter +'</h3></div>';
            }

            html += '<a href="'+link+'" class="result-item">' +
                        imagem +
                        '<div class="result-item-content">' +
                            '<h4>'+data[i].nome+'</h4>' +
                            '<p>'+data[i].excerpt+'</p>' +
                        '</div>' +
                        '<span class="result-item-category" '+bg+'>'+category+'</span>' +
                    '</a>';

            if (i != (data.length-1)) {
                html += '<div class="divider"></div>';
            }


            $("#search-result").html( html );
        }
    });
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


function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }

    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);

    return "#" + padZero(r) + padZero(g) + padZero(b);
}

function generateColors() {
    var url = "https://turismo-quissama.000webhostapp.com/agenda/";
    var colors = {};
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    for(var i = 0; i < alphabet.length; i++) {
        var color = "#000000".replace(/0/g, function(){
            return (~~(Math.random()*16)).toString(16);
        });

        colors[alphabet[i]] = {
            background: color,
            color: invertColor(color, true)
        };
    }

    return colors
}
