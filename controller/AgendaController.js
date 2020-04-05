class AgendaController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        this._inputId = $('#id');
        this._inputNome = $('#nome');
        this._inputDescricao = $('#descricao');
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        this._listaAgendas = new ListaAgendas();
        this._agendasView = new AgendasView($('#agendasView'), this._paginaAgendaDia);
        this._agendasView.update(this._listaAgendas);
        this._buscar();
    }

    get listaAgendas() {
        return this._listaAgendas;
    }

    get agendasView() {
        return this._agendasView;
    }

    get mensagemView() {
        return this._mensagemView;
    }

    get mensagem() {
        return this._mensagem;
    }

    get urlAgenda() {
        return this._urlAgenda;
    }

    alteraAgenda(idAgenda, nomeAgenda, descricaoAgenda) {
        this._inputId.value = idAgenda;
        this._inputNome.value = nomeAgenda;
        this._inputDescricao.value = descricaoAgenda;
    }

    excluiAgenda(idAgenda, nomeAgenda) {
        if (confirm("Confirma a exclusão da agenda " + nomeAgenda + "?")) {
            setTimeout(function() {
                agendaController._remover(idAgenda);
            }, 500);
        }
    }

    gravar(event) {
        event.preventDefault();
        let id = this._inputId.value;
        let nome = this._inputNome.value;
        let descricao = this._inputDescricao.value;
        if (id == '') {
            this._cadastrar(nome, descricao);
        }
        else {
            this._alterar(id, nome, descricao);
        }
    }
    
    _limpaFormulario() {
        this._inputId.value = '';
        this._inputNome.value = '';
        this._inputDescricao.value = '';
        this._inputId.focus();
    }

    _buscar() {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this._urlAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//        xhr.addEventListener("load", (event) => this.getAgendas(event, this._listaAgendas, this._agendasView));
        xhr.addEventListener("load", (event) => {
            let xhr = event.target;
            let erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                let agendas = JSON.parse(xhr.responseText);
                agendas.forEach(a => agendaController.listaAgendas.adiciona(new Agenda(a.id, a.nome, a.descricao)));
                agendaController.agendasView.update(agendaController.listaAgendas);
                agendaController.mensagem.texto = '';
                agendaController.mensagemView.update(agendaController.mensagem);  
            }
            else {
                console.log(xhr.status);
                console.log(xhr.responseText);
                erroAjax.classList.remove("invisivel");
            }
        });
        xhr.send();
    }

    _cadastrar(nome, descricao) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", this._urlAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            let erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 201) {
                erroAjax.classList.add("invisivel");
                let dtoRetorno = JSON.parse(xhr.responseText);
                agendaController.listaAgendas.adiciona(new Agenda(dtoRetorno.id, dtoRetorno.nome, dtoRetorno.descricao));
                agendaController.agendasView.update(agendaController.listaAgendas);
                agendaController.mensagem.texto = 'Agenda cadastrada com sucesso!';
                agendaController.mensagemView.update(agendaController.mensagem);  
//                window.alert("Agenda cadastrada com sucesso!");
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
    
    _alterar(id, nome, descricao) {
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", this._urlAgenda + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", function() {
            let erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                let dtoRetorno = JSON.parse(xhr.responseText);
                agendaController.listaAgendas.altera(new Agenda(dtoRetorno.id, dtoRetorno.nome, dtoRetorno.descricao));
                agendaController.agendasView.update(agendaController.listaAgendas);
                agendaController.mensagem.texto = 'Agenda alterada com sucesso!';
                agendaController.mensagemView.update(agendaController.mensagem);  
//                window.alert("Agenda alterada com sucesso!");
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

    _remover(idAgenda) {
        let xhr = new XMLHttpRequest();
        xhr.open("DELETE", this._urlAgenda + idAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//        xhr.addEventListener("load", (event) => this.deleteAgenda(event, idAgenda, this._listaAgendas, this._agendasView));
        xhr.addEventListener("load", (event) => {
            let xhr = event.target;
            let erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                agendaController.listaAgendas.remove(idAgenda);
                agendaController.agendasView.update(agendaController.listaAgendas);
                agendaController.mensagem.texto = '';
                agendaController.mensagemView.update(agendaController.mensagem);  
            }
            else {
                console.log(xhr.status);
                console.log(xhr.responseText);
                erroAjax.classList.remove("invisivel");
            }
        });
        xhr.send();
    }

}