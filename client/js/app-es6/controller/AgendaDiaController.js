import {Bind} from '../helper/Bind.js';
import {Mensagem} from '../model/Mensagem.js';
import {MensagemView} from '../view/MensagemView.js';
import {AgendaDia} from '../model/AgendaDia.js';
import {AgendaDiaView} from '../view/AgendaDiaView.js';
import {DateHelper} from '../helper/DateHelper.js';
import {AgendaService} from '../service/AgendaService.js';

class AgendaDiaController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._idAgenda = this._recuperaIdAgenda();
        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        this._data = new Date();
//        this._data.setHours(0, 0, 0, 0);
        console.log(this._data);
        this._labelNomeAgenda = $('#nome-agenda');
        this._labelNomeAgenda.textContent = '';
        this._botaoHoje = $('#hoje');
        this._botaoAnterior = $('#anterior');
        this._botaoProximo = $('#proximo');
        this._inputDataCorrente = $('#data-corrente');
        this._inputDataCorrente.valueAsDate = new Date(this._data.getTime());
        console.log(this._inputDataCorrente.valueAsDate);
        // Associa o model 'Mensagem' com a view 'MensagemView', atualizando a view
        // sempre que o atributo 'texto' for alterado
        this._mensagem = new Bind (
            new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        // Associa o model 'ListaAgendas' com a view 'AgendasView', atualizando a view
        // sempre que os métodos 'adiciona', 'remove', 'altera' e 'ordena' forem chamados
        this._agendaDia = new Bind (new AgendaDia(this._data), 
            new AgendaDiaView($('#agendaDiaView')), 'dia');
        this._detalhar(this._idAgenda);
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
    }

    diaAnterior() {
        this._data = DateHelper.adicionaDias(this._data, -1);
        this._inputDataCorrente.valueAsDate = this._data;
        this._agendaDia.dia = this._data;
    }

    diaCorrente() {
        this._data = new Date();
        this._inputDataCorrente.valueAsDate = this._data;
        this._agendaDia.dia = this._data;
    }

    atualizaData() {
        console.log('Entrou em atualizaData');
        this._data = new Date(this._inputDataCorrente.valueAsDate.getTime());
        this._agendaDia.dia = this._data;
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

    _detalhar(id) {
        let service = new AgendaService();
        service
            .detalhar(id)
            .then(agenda => {
                this._labelNomeAgenda.textContent = agenda.nome;
                this._mensagem.texto = '';
            })
            .catch(error => this._mensagem.texto = error.message);  
    }    

}

let agendaDiaController = new AgendaDiaController();

export function currentInstance2() {
    return agendaDiaController;
}