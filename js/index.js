var nomeHtmlAgenda = "agenda-dia_v2.html";

window.onload = inicializa;

function inicializa() {
    var botaoNovaAgenda = document.querySelector("#nova-agenda");
    botaoNovaAgenda.addEventListener("click", () => {
        window.location.href = "agenda-form.html";
    }); 
    buscaAgendas();
}

function buscaAgendas() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8080/psicologia/agendas");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var agendas = JSON.parse(xhr.responseText);
            agendas.forEach(agenda => {
                adicionaAgendaNaTabela(agenda);
            });
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send();
}

function excluiAgenda(id) {
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE","http://localhost:8080/psicologia/agendas/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var agendas = JSON.parse(xhr.responseText);
            agendas.forEach(agenda => {
                adicionaAgendaNaTabela(agenda);
            });
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send();
}

function adicionaAgendaNaTabela(agenda) {
    var tbody = document.querySelector("tbody");
    var tr = criaTr("tr-agenda");
    var tdNome = criaTd("", "td-nome-agenda");
    var href = nomeHtmlAgenda + "?nome=" + agenda.nome;
    var a = criaA(href, agenda.nome);
    var tdDescricao = criaTd(agenda.descricao, "td-descricao-agenda");
    var tdId = criaTd(agenda.id, "td-id-agenda");
    tdId.classList.add("invisivel");
    var tdAlterar = criaTd("", "td-alterar-agenda");
    var btnAlterar = criaButton("Alterar", "btn-alterar");
    tdAlterar.appendChild(btnAlterar);
    var tdExcluir = criaTd("", "td-excluir-agenda");
    var btnExcluir = criaButton("Excluir", "btn-excluir");
    btnExcluir.addEventListener("click", function(event) {
        var nomeAgenda = event.target.parentNode.parentNode.querySelector(".td-nome-agenda").textContent;
        var idAgenda = event.target.parentNode.parentNode.querySelector(".td-id-agenda").textContent;
        if (confirm("Confirma a exclusão da agenda " + nomeAgenda + "?")) {
            setTimeout(function() {
                excluiAgenda(idAgenda);
                event.target.parentNode.parentNode.remove();
            }, 500);
        }
    });
    tdExcluir.appendChild(btnExcluir);
    tdNome.appendChild(a);
    tr.appendChild(tdNome);
    tr.appendChild(tdDescricao);
    tr.appendChild(tdId);
    tr.appendChild(tdAlterar);
    tr.appendChild(tdExcluir);
    tbody.appendChild(tr);
}
