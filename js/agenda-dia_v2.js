var horas = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
var diasSemana = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"];
var dataAgenda = new Date();

Date.prototype.addDias = function(dias) {
    return new Date(this.getTime() + (dias * 24 * 60 * 60 * 1000));
};

window.onload = inicializa;

function inicializa() {
    var nomeAgenda = recuperaParametroNomeAgenda();
//    setNomeAgenda(nomeAgenda.replace(/%20/g," "));
    setNomeAgenda(decodeURI(nomeAgenda));
    criaAgendaDiaria();
    var datePicker = document.querySelector("#data-corrente");
    datePicker.valueAsDate = getDataAgenda();
    var botaoHoje = document.querySelector("#hoje");
    botaoHoje.addEventListener("click", () => {
        setDataAgenda(new Date());
    }); 
    var botaoAnterior = document.querySelector("#anterior");
    botaoAnterior.addEventListener("click", () => {
        setDataAgenda(getDataAgenda().addDias(-1));
    }); 
    var botaoProximo = document.querySelector("#proximo");
    botaoProximo.addEventListener("click", () => {
        setDataAgenda(getDataAgenda().addDias(1));
    }); 
}

function recuperaParametroNomeAgenda() {
    var parametros=location.search.split("?");
    if (parametros != "") {
        var valorParametro = parametros[1].split("=");
        if (valorParametro != "") {
            return valorParametro[1];
        }
        else {
            return "Nome da Agenda";
        }
    }
    else {
        return "Nome da Agenda";
    }
}

function setNomeAgenda(nome) {
    var label = document.querySelector("#nome-agenda");
    label.textContent = nome;
}

function adicionaAgendaNoSelect(agenda) {
    var selectAgenda = document.querySelector("#seleciona-agenda");
    var option = criaOption(agenda.nome);
    selectAgenda.appendChild(option);
}

function setDataAgenda(data) {
    dataAgenda = data;
    alteraData();
}

function getDataAgenda() {
    return dataAgenda;
}

function alteraData() {
    console.log("data: " + getDataAgenda());
    console.log("dia da semana: " + getDataAgenda().getDay());
    var datePicker = document.querySelector("#data-corrente");
    datePicker.valueAsDate = getDataAgenda();
    var th = document.querySelector(".th-diaria-data");
    var diaSemana = diasSemana[getDataAgenda().getDay()];
    var dia = getDataAgenda().getDate();
    th.textContent = diaSemana + ". " + dia;
}

function criaAgendaDiaria() {
    var table = document.querySelector(".tabela-diaria");
    table.appendChild(criaCabecalhoTabelaDiaria());
    table.appendChild(criaCorpoTabelaDiaria());
}

function criaCabecalhoTabelaDiaria() {
    var thead = criaThead("");
    var tr = criaTr("");
    tr.appendChild(criaTh("Hora","th-diaria-hora"));
    var data = new Date();
    var diaSemana = diasSemana[data.getDay()];
    var dia = data.getDate();
    tr.appendChild(criaTh(diaSemana + ". " + dia,"th-diaria-data"));
    thead.appendChild(tr);
    return thead;
}

function criaCorpoTabelaDiaria() {
    var tbody = document.createElement("tbody");
    horas.forEach(hora => {
        var tr = criaTr("tr-diaria");
        tr.appendChild(criaTd(hora,"td-diaria"));
        tr.appendChild(criaTd("","td-diaria"));
        tbody.appendChild(tr);
    });
    return tbody;
}

function insereTabelaCompromisso() {

}
