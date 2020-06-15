import {Bind} from '../helper/Bind.js';
import {Mensagem} from '../model/Mensagem.js';
import {MensagemView} from '../view/MensagemView.js';
import {AgendaDia} from '../model/AgendaDia.js';
import {AgendaDiaView} from '../view/AgendaDiaView.js';
import {DateHelper} from '../helper/DateHelper.js';
import {AgendaService} from '../service/AgendaService.js';
import {CabecalhoAgendaView} from '../view/CabecalhoAgendaView.js';
import {Agenda} from '../model/Agenda.js';

class AgendaDiaController {
    
    private _idAgenda: number;
    private _urlAgenda: string;
    private _paginaAgendaDia: string;
    private _mensagem: any;
    private _agendaDia: any;
    private _cabecalhoAgendaDia: any;

    constructor() {
        this._idAgenda = this._recuperaIdAgenda();
        if (this._idAgenda == -1) {
            // Não conseguiu recuperar o id da agenda
            window.location.replace("index.html");
        }
        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        // Associa o model 'Mensagem' com a view 'MensagemView', atualizando a view
        // sempre que o atributo 'texto' for alterado
        this._mensagem = new Bind (
            new Mensagem(), new MensagemView('#mensagemView'), 'texto');
        let agendaDia = new AgendaDia(new Date(), '');
            // Associa o model 'AgendaDia' com a view 'AgendasView', atualizando a view
        // sempre que o método 'dia' for chamado
        this._agendaDia = new Bind (agendaDia, new AgendaDiaView('#agendaDiaView'), 'dia');
        // Associa o model 'AgendaDia' com a view 'CabecalhoAgendaView', atualizando a view
        // sempre que os métodos 'dia' e 'nome' forem chamados
        this._cabecalhoAgendaDia = new Bind (agendaDia, new CabecalhoAgendaView('#cabecalhoView'), 'dia', 'nome');
        this._detalhar(this._idAgenda);
    }

    _atualizaDataModelo(data: Date): void {
        // A atualização da data deve ser refletida em todas as views associadas ao modelo
        this._agendaDia.dia = data;
        this._cabecalhoAgendaDia.dia = data;
    }

    voltar(): void {
        window.location.replace("index.html");
    }
    
    proximoDia(): void {
        this._atualizaDataModelo(DateHelper.adicionaDias(this._agendaDia.dia, 1));
    }

    diaAnterior(): void {
        this._atualizaDataModelo(DateHelper.adicionaDias(this._agendaDia.dia, -1));
    }

    diaCorrente(): void {
        this._atualizaDataModelo(new Date());
    }

    atualizaData(data: Date): void {
        this._atualizaDataModelo(new Date(data));
    }

    _recuperaIdAgenda(): number {
        var query = location.search.slice(1);
        if (query == "") {
            // O id da agenda não foi passado como parâmetro
            window.alert("Agenda não encontrada!");
            return -1;
        }
        else {
            let partes = query.split('&');
            // let mapa = {};
            // partes.forEach(function (parte) {
            //     let chaveValor = parte.split('=');
            //     let chave = chaveValor[0];
            //     let valor = chaveValor[1];
            //     mapa[chave] = valor;
            // });  
            // return mapa["id"];
            let mapa = new Map();
            partes.forEach(function (parte) {
                let chaveValor = parte.split('=');
                let chave = chaveValor[0];
                let valor = chaveValor[1];
                mapa.set(chave, valor)
            });  
            return mapa.get("id");
        }
    }

    _detalhar(id: number): void {
        let service = new AgendaService();
        service
            .detalhar(id)
            .then((agenda: Agenda) => {
                this._cabecalhoAgendaDia.nome = agenda.nome;
                this._mensagem.texto = '';
            })
            .catch((error: Error) => this._mensagem.texto = error.message);  
    }    

}

let agendaDiaController = new AgendaDiaController();

export function agendaDiaControllerInstance() {
    return agendaDiaController;
}
