class AgendaController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        this._inputId = $('#id');
        this._inputNome = $('#nome');
        this._inputDescricao = $('#descricao');
        this._listaAgendas = new ListaAgendas();
        this._agendasView = new AgendasView($('#agendasView'), this._paginaAgendaDia);
        this._agendasView.update(this._listaAgendas);

        this.buscaAgendas();
        this._inputId.focus();
    }

    get listaAgendas() {
        return this._listaAgendas;
    }

    get agendasView() {
        return this._agendasView;
    }

    buscaAgendas() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this._urlAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//        xhr.addEventListener("load", (event) => this.getAgendas(event, this._listaAgendas, this._agendasView));
        xhr.addEventListener("load", (event) => {
            let xhr = event.target;
            var erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                var agendas = JSON.parse(xhr.responseText);
                agendas.forEach(a => agendaController.listaAgendas.adiciona(new Agenda(a.id, a.nome, a.descricao)));
                agendaController.agendasView.update(agendaController.listaAgendas);
            }
            else {
                console.log(xhr.status);
                console.log(xhr.responseText);
                erroAjax.classList.remove("invisivel");
            }
        });
        xhr.send();
    }

    incluiAgenda() {
        window.location.href = "agenda-form.html";
    }

    alteraAgenda(idAgenda) {
        var nomeAgenda = event.target.parentNode.parentNode.querySelector(".td-nome-agenda").textContent;
        var descricaoAgenda = event.target.parentNode.parentNode.querySelector(".td-descricao-agenda").textContent;
        var idAgenda = event.target.parentNode.parentNode.querySelector(".td-id-agenda").textContent;
        window.location.href = "agenda-form.html?id=" + idAgenda + "&nome=" + nomeAgenda + "&descricao=" + descricaoAgenda;
    }

    excluiAgenda(idAgenda, nomeAgenda) {
        if (confirm("Confirma a exclusão da agenda " + nomeAgenda + "?")) {
            setTimeout(function() {
                agendaController.removeAgenda(idAgenda);
            }, 500);
        }
    }

    removeAgenda(idAgenda) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", this._urlAgenda + idAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//        xhr.addEventListener("load", (event) => this.deleteAgenda(event, idAgenda, this._listaAgendas, this._agendasView));
        xhr.addEventListener("load", (event) => {
            let xhr = event.target;
            var erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                agendaController.listaAgendas.remove(idAgenda);
                agendaController.agendasView.update(agendaController.listaAgendas);
            }
            else {
                console.log(xhr.status);
                console.log(xhr.responseText);
                erroAjax.classList.remove("invisivel");
            }
        });
        xhr.send();
    }

    gravar(event) {
        event.preventDefault();
        let id = this._inputId.value;
        let nome = this._inputNome.value;
        let descricao = this._inputDescricao.value;
        if (id == '') {
            this._insereAgenda(nome, descricao);
        }
        else {
            this._alteraAgenda(id, nome, descricao);
        }
    }
    
    _limpaFormulario() {
        this._inputId.value = '';
        this._inputNome.value = '';
        this._inputDescricao.value = '';

        this._inputId.focus();
    }

    _insereAgenda(nome, descricao) {
        console.log('Entrou em insereAgenda')
        let xhr = new XMLHttpRequest();
        xhr.open("POST", this._urlAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 201) {
                erroAjax.classList.add("invisivel");
                let dtoRetorno = JSON.parse(xhr.responseText);
                agendaController.listaAgendas.adiciona(new Agenda(dtoRetorno.id, dtoRetorno.nome, dtoRetorno.descricao));
                agendaController.agendasView.update(agendaController.listaAgendas);
                window.alert("Agenda cadastrada com sucesso!");
                agendaController._limpaFormulario();
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
        xhr.send(JSON.stringify(new AgendaDto(nome, descricao)));
    }
    
    _alteraAgenda(id, nome, descricao) {
        console.log('Entrou em alteraAgenda')
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", this._urlAgenda + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            var erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                window.alert("Agenda alterada com sucesso!");
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
        xhr.send(JSON.stringify(new AgendaDto(nome, descricao)));
    }
    
}