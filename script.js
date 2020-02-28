
var agenda = JSON.parse(localStorage.getItem('Agenda')) || [];
$(function () {
    if (agenda.length > 0)
        carregarAgenda(agenda);

    $("#btn1").click(gravarDados);
    $("#btn2").click(consultarDados);
    $("#btn3").click(function () {
        apagarDados();
    });
});

function gravarDados() {

    agenda = JSON.parse(localStorage.getItem('Agenda')) || [];
    var contato = {
        'Nome': $("#nome").val(),
        'Email': $("#email").val(),
        'Fone': $("#fone").val()
    }
    agenda.push(contato);
    localStorage.setItem("Agenda", JSON.stringify(agenda))
    limparCampos();
    carregarAgenda(JSON.parse(localStorage.getItem('Agenda')));
    Mensagem("Dados gravados com sucesso !!!")

}

function consultarDados() {
    if (localStorage.length > 0) {
        if ($("#nome").val() !== "") {
            var agendaFiltro = [];
            JSON.parse(localStorage.getItem('Agenda')).find(item => {
                if (item.Nome.toLocaleLowerCase().includes($("#nome").val().toLocaleLowerCase())) {
                    agendaFiltro.push(item)
                }
            })
            carregarAgenda(agendaFiltro);
        }
        else if ($("#email").val() !== "") {
            var agendaFiltro = [];
            JSON.parse(localStorage.getItem('Agenda')).find(item => {
                if (item.Email.toLocaleLowerCase().includes($("#email").val().toLocaleLowerCase())) {
                    agendaFiltro.push(item)
                }
            })
            carregarAgenda(agendaFiltro);
        }
        else {
            carregarAgenda(JSON.parse(localStorage.getItem('Agenda')));


        }
    }
    else {
        Mensagem("Nenhum registro encontrado");
    }
}
function carregarAgenda(listaAgenda) {
    $('#lista tbody').empty();
    $.each(listaAgenda, function (key, item) {
        $('#lista tbody').append("<tr><td>" + item.Nome + "</td><td>" + item.Email + "</td><td>" + item.Fone + "</td></tr>");
    });
}
function apagarDados() {
    if (localStorage.length > 0) {
        localStorage.clear();
        carregarAgenda([]);
    }
    else {
        Mensagem("Nenhum registro encontrado");
    }
    limparCampos();
}
function limparCampos() {
    $("#nome").val("");
    $("#email").val("");
    $("#fone").val("");
}
function Mensagem(texto) {
    $('#ModalTexto').text(texto)
    $('#avisoModal').modal();
}