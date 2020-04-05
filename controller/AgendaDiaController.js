class AgendaDiaController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._idAgenda = this._recuperaIdAgenda();
        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        this._data = new Date();
        this._labelNomeAgenda = $('#nome-agenda');
        this._labelNomeAgenda.textContent = '';
        this._botaoHoje = $('#hoje');
        this._botaoAnterior = $('#anterior');
        this._botaoProximo = $('#proximo');
        this._inputDataCorrente = $('#data-corrente');
        this._inputDataCorrente.valueAsDate = this._data;
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
        this._agendaDia = new AgendaDia(this._data);
        this._agendaDiaView = new AgendaDiaView($('#agendaDiaView'));
        this._agendaDiaView.update(this._agendaDia);
        this._detalhar(this._idAgenda);
//        console.log(this._data.toTimeString());
//        console.log(this._agendaDia.horas);
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

    proximoDia() {
        this._data = DateHelper.adicionaDias(this._data, 1);
        this._inputDataCorrente.valueAsDate = this._data;
        this._agendaDia.dia = this._data;
        this._agendaDiaView.update(this._agendaDia);
    }

    diaAnterior() {
        this._data = DateHelper.adicionaDias(this._data, -1);
        this._inputDataCorrente.valueAsDate = this._data;
        this._agendaDia.dia = this._data;
        this._agendaDiaView.update(this._agendaDia);
    }

    diaCorrente() {
        this._data = new Date();
        this._inputDataCorrente.valueAsDate = this._data;
        this._agendaDia.dia = this._data;
        this._agendaDiaView.update(this._agendaDia);
    }

    atualizaData() {
        this._data = new Date(this._inputDataCorrente.valueAsDate.getTime());
        this._agendaDia.dia = this._data;
        this._agendaDiaView.update(this._agendaDia);
    }

    _recuperaIdAgenda() {
        var query = location.search.slice(1);
        if (query == "") {
            window.alert("Agenda não encontrada!");
            window.location.replace("index.html");
        }
        else {
            let partes = query.split('&');
            let mapa = {};
            partes.forEach(function (parte) {
                let chaveValor = parte.split('=');
                let chave = chaveValor[0];
                let valor = chaveValor[1];
                mapa[chave] = valor;
            });  
            return mapa["id"];
        }
    }

    _detalhar(idAgenda) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", this._urlAgenda + idAgenda);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.addEventListener("load", (event) => {
            let xhr = event.target;
            let erroAjax = document.querySelector("#erro-ajax");
            if (xhr.status == 200) {
                erroAjax.classList.add("invisivel");
                let dtoRetorno = JSON.parse(xhr.responseText);
                agendaDiaController._labelNomeAgenda.textContent = dtoRetorno.nome;
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

}