var nomeHtmlAgenda = "agenda-dia_v2.html";

window.onload = inicializa;

function inicializa() {
    var botaoNovaAgenda = document.querySelector("#nova-agenda");
    botaoNovaAgenda.addEventListener("click", () => {
        window.location.href = "agenda-form.html";
    }); 
    buscaAgendas();
}

function adicionaAgendaNaTabela(agenda) {
    var tbody = document.querySelector("tbody");
    var tr = criaTr("tr-agenda");
    var tdNome = criaTd("", "td-nome-agenda");
    var href = nomeHtmlAgenda + "?id=" + agenda.id;
    var a = criaA(href, agenda.nome);
    var tdDescricao = criaTd(agenda.descricao, "td-descricao-agenda");
    var tdId = criaTd(agenda.id, "td-id-agenda");
    tdId.classList.add("invisivel");
    var tdAlterar = criaTd("", "td-alterar-agenda");
    var btnAlterar = criaButton("Alterar", "btn-alterar");
    btnAlterar.addEventListener("click", function(event) {
        var nomeAgenda = event.target.parentNode.parentNode.querySelector(".td-nome-agenda").textContent;
        var descricaoAgenda = event.target.parentNode.parentNode.querySelector(".td-descricao-agenda").textContent;
        var idAgenda = event.target.parentNode.parentNode.querySelector(".td-id-agenda").textContent;
        window.location.href = "agenda-form.html?id=" + idAgenda + "&nome=" + nomeAgenda + "&descricao=" + descricaoAgenda;
    });
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
