import {Mensagem} from '../model/Mensagem.js';
import {MensagemView} from '../view/MensagemView.js';
import {ListaAgendas} from '../model/ListaAgendas.js';
import {AgendasView} from '../view/AgendasView.js';
import {AgendaService} from '../service/AgendaService.js';
import {AgendaDto} from '../dto/AgendaDto.js';
import {Bind} from '../helper/Bind.js';
import {Agenda} from '../model/Agenda.js';

class AgendaController {

    private _urlAgenda: string;
    private _paginaAgendaDia: string;
    private _inputId: JQuery;
    private _inputNome: JQuery;
    private _inputDescricao: JQuery;
    private _mensagem: any;
    private _listaAgendas: any;
    private _ordemAtual: string;
    
    constructor() {
        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._paginaAgendaDia = "agenda-dia_v2.html";
        this._inputId = $('#id');
        this._inputNome = $('#nome');
        this._inputDescricao = $('#descricao');
        // Associa o model 'Mensagem' com a view 'MensagemView', atualizando a view
        // sempre que o atributo 'texto' for alterado
        this._mensagem = new Bind (
            new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
        // Associa o model 'ListaAgendas' com a view 'AgendasView', atualizando a view
        // sempre que os métodos 'adiciona', 'remove', 'altera' e 'ordena' forem chamados
        this._listaAgendas = new Bind (new ListaAgendas(), 
            new AgendasView($('#agendasView'), this._paginaAgendaDia), 'adiciona', 'remove', 'altera', 'ordena');
        // Atributo utilizado para a ordenação da tabela de agendas            
        this._ordemAtual = '';
        this._buscaAgendas();
    }

    get listaAgendas(): any {
        return this._listaAgendas;
    }

    get mensagem(): any {
        return this._mensagem;
    }

    get urlAgenda(): string {
        return this._urlAgenda;
    }

    alteraAgenda(idAgenda: number, nomeAgenda: string, descricaoAgenda: string): void {
        this.mensagem.texto = '';
        this._inputId.val(idAgenda);
        this._inputNome.val(nomeAgenda);
        this._inputDescricao.val(descricaoAgenda);
    }

    excluiAgenda(idAgenda: number, nomeAgenda: string): void {
        this.mensagem.texto = '';
        if (confirm("Confirma a exclusão da agenda " + nomeAgenda + "?")) {
            setTimeout(() => this._excluiAgenda(idAgenda, nomeAgenda), 500);
        }
    }

    gravar(event: Event): void {
        event.preventDefault();
        let id = <number>this._inputId.val();
        let nome = <string>this._inputNome.val();
        let descricao = <string>this._inputDescricao.val();
        if (id == null) {
            this._incluiAgenda(nome, descricao);
        }
        else {
            this._alteraAgenda(id, nome, descricao);
        }
    }
    
    cancelar(event: Event): void {
        this._limpaFormulario();
        this.mensagem.texto = '';
    }

    _limpaFormulario(): void {
        this._inputId.val(null);
        this._inputNome.val('');
        this._inputDescricao.val('');
        this._inputId.focus();
    }

    _buscaAgendas(): void {
        let service = new AgendaService();
        service
            .buscar()
            .then((agendas: Agenda[]) => {
                agendas.forEach(agenda => this._listaAgendas.adiciona(agenda));
                this._mensagem.texto = '';
            })
            .catch((error: Error) => this._mensagem.texto = error.message);  
    }

    _incluiAgenda(nome:string, descricao:string): void {
        let service = new AgendaService();
        service
            .cadastrar(new AgendaDto(nome, descricao))
            .then((agenda: Agenda) => {
                this._listaAgendas.adiciona(agenda);
                this._mensagem.texto = 'Agenda cadastrada com sucesso!';
                this._limpaFormulario();
            })
            .catch((error: Error) => this._mensagem.texto = error.message);  
    }
    
    _alteraAgenda(id:number, nome:string, descricao:string): void {
        let service = new AgendaService();
        service
            .alterar(new AgendaDto(nome, descricao), id)
            .then((agenda: Agenda) => {
                this._listaAgendas.altera(agenda);
                this._mensagem.texto = 'Agenda alterada com sucesso!';
                this._limpaFormulario();
            })
            .catch((error: Error) => this._mensagem.texto = error.message);  
    }

    _excluiAgenda(id:number, nome:string): void {
        let service = new AgendaService();
        service
            .remover(id, nome)
            .then((agenda: Agenda) => {
                this._listaAgendas.remove(id);
                this._mensagem.texto = 'Agenda excluída com sucesso!';
            })
            .catch((error: Error) => this._mensagem.texto = error.message);  
    }

}

let agendaController = new AgendaController();

export function agendaControllerInstance(): AgendaController {
    return agendaController;
}
