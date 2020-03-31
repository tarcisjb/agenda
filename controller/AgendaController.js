class AgendaController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._urlAgenda = "http://localhost:8080/psicologia/agendas";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        this._listaAgendas = new ListaAgendas();
        this._agendasView = new AgendasView($('#agendasView'), this._paginaAgendaDia);
        this._agendasView.update(this._listaAgendas);

        this.buscaAgendas();
    }

    buscaAgendas() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this._urlAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.addEventListener("load", (event) => this.getAgendas(event, this._listaAgendas, this._agendasView));
        xhr.send();
    }

    getAgendas(event, listaAgendas, agendasView) {
        let xhr = event.target;
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            var agendas = JSON.parse(xhr.responseText);
            agendas.forEach(a => listaAgendas.adiciona(new Agenda(a.id, a.nome, a.descricao)));
            agendasView.update(listaAgendas);
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }

    }

    incluiAgenda() {
        window.location.href = "agenda-form.html";
    }

    alteraAgenda() {

    }

    excluiAgenda() {

    }
}