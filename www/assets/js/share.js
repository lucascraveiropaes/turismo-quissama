$(".share-icon, .close-modal").click(function() {
    $("#share-modal").fadeToggle("fast", "linear");
});
$(".share-modal-opacity").click(function() {
    $("#share-modal").fadeToggle("fast", "linear");
});

function setShareLinks(data) {
    var content = data.nome+"%20-%20"+data.descricao
    var twitter = "https://twitter.com/intent/tweet?text="+content;
    var facebook = "http://www.facebook.com/share.php?t="+content;
    var whatsapp = "whatsapp://send?text=*"+data.nome+"*%20-%20"+data.descricao;

    $(".twitter").attr("href", twitter);
    $(".facebook").attr("href", facebook);
    $(".whatsapp").attr("href", whatsapp);
}
