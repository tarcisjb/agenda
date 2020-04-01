const urlAgenda = "http://localhost:8080/psicologia/agendas";

class AgendaDto {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}

/*
function buscaAgendas() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlAgenda);
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
*/

function buscaAgenda(idAgenda) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlAgenda + "/" + idAgenda);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var agenda = JSON.parse(this.responseText);
            setNomeAgenda(agenda.nome);
            console.log("setou o nome da agenda");
        }
        else if (xhr.status == 409) {
            erroAjax.classList.remove("invisivel");
            window.alert("Já existe uma agenda com este nome!");
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send();
}
function insereAgenda(agendaDto) {
    console.log(agendaDto);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlAgenda);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 201) {
            erroAjax.classList.add("invisivel");
            window.alert("Agenda cadastrada com sucesso!");
            window.location.replace("index.html");
        }
        else if (xhr.status == 409) {
            erroAjax.classList.remove("invisivel");
            window.alert("Já existe uma agenda com este nome!");
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send(JSON.stringify(agendaDto));
}

function alteraAgenda(id, agendaDto) {
    console.log(agendaDto);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", urlAgenda + "/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            window.alert("Agenda alterada com sucesso!");
            window.location.replace("index.html");
        }
        else if (xhr.status == 409) {
            erroAjax.classList.remove("invisivel");
            window.alert("Já existe uma agenda com este nome!");
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send(JSON.stringify(agendaDto));
}

/*
function removeAgenda(id) {
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
*/
