import {Bind} from '../helper/Bind.js';
import {Mensagem} from '../model/Mensagem.js';
import {MensagemView} from '../view/MensagemView.js';
import {AgendaDia} from '../model/AgendaDia.js';
import {AgendaDiaView} from '../view/AgendaDiaView.js';
import {DateHelper} from '../helper/DateHelper.js';
import {AgendaService} from '../service/AgendaService.js';
import {CabecalhoAgendaView} from '../view/CabecalhoAgendaView.js';

class AgendaDiaController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._idAgenda = this._recuperaIdAgenda();
        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        // Associa o model 'Mensagem' com a view 'MensagemView', atualizando a view
        // sempre que o atributo 'texto' for alterado
        this._mensagem = new Bind (
            new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        let agendaDia = new AgendaDia(new Date(), '');
            // Associa o model 'AgendaDia' com a view 'AgendasView', atualizando a view
        // sempre que o método 'dia' for chamado
        this._agendaDia = new Bind (agendaDia, new AgendaDiaView($('#agendaDiaView')), 'dia');
        // Associa o model 'AgendaDia' com a view 'CabecalhoAgendaView', atualizando a view
        // sempre que os métodos 'dia' e 'nome' forem chamados
        this._cabecalhoAgendaDia = new Bind (agendaDia, new CabecalhoAgendaView($('#cabecalhoView')), 'dia', 'nome');
        this._detalhar(this._idAgenda);
    }

    _atualizaDataModelo(data) {
        // A atualização da data deve ser refletida em todas as views associadas ao modelo
        this._agendaDia.dia = data;
        this._cabecalhoAgendaDia.dia = data;
    }

    voltar() {
        window.location.replace("index.html");
    }
    
    proximoDia() {
        this._atualizaDataModelo(DateHelper.adicionaDias(this._agendaDia.dia, 1));
    }

    diaAnterior() {
        this._atualizaDataModelo(DateHelper.adicionaDias(this._agendaDia.dia, -1));
    }

    diaCorrente() {
        this._atualizaDataModelo(new Date());
    }

    atualizaData(data) {
        this._atualizaDataModelo(new Date(data));
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
                this._cabecalhoAgendaDia.nome = agenda.nome;
                this._mensagem.texto = '';
            })
            .catch(error => this._mensagem.texto = error.message);  
    }    

}

let agendaDiaController = new AgendaDiaController();

export function agendaDiaControllerInstance() {
    return agendaDiaController;
}
