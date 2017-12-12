$(document).ready(function() {

    $('form#novo-usuario').submit(function (e) {
        e.preventDefault();

        formData = JSON.stringify({
            primeiroNome : $("#primeiroNome").val(),
            sobrenome: $('#sobrenome').val(),
            senha: $('#senha').val(),
            email: $('#email').val()
        });

        $.ajax({
            type: "POST",
            url: "http://localhost:8000/usuarios",

            crossDomain: true,
            cache: false,

            data: {
                primeiroNome : $("#primeiroNome").val(),
                sobrenome: $('#sobrenome').val(),
                senha: $('#senha').val(),
                email: $('#email').val()
            },

            dataType: "json",


            success: function(data) {
                if (data) {
                    alert("Cadastrado");
                    alert(data);
                } else {
                    alert("Problemas em conectar com o servidor. Tente mais tarde.");
                }
            },

            error: function(jqXHR, textStatus, errorThrown){
                alert(textStatus);
            }
        });
    });
});