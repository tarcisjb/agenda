import {Mensagem} from '../model/Mensagem.js';
import {MensagemView} from '../view/MensagemView.js';
import {ListaAgendas} from '../model/ListaAgendas.js';
import {AgendasView} from '../view/AgendasView.js';
import {AgendaService} from '../service/AgendaService.js';
import {AgendaDto} from '../dto/AgendaDto.js';
import {Bind} from '../helper/Bind.js';

class AgendaController {

    constructor() {
        let $ = document.querySelector.bind(document);

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
        this.mensagem.texto = '';
        this._inputId.value = idAgenda;
        this._inputNome.value = nomeAgenda;
        this._inputDescricao.value = descricaoAgenda;
    }

    excluiAgenda(idAgenda, nomeAgenda) {
        this.mensagem.texto = '';
        if (confirm("Confirma a exclusão da agenda " + nomeAgenda + "?")) {
            setTimeout(() => this._excluiAgenda(idAgenda, nomeAgenda), 500);
        }
    }

    gravar(event) {
        event.preventDefault();
        let id = this._inputId.value;
        let nome = this._inputNome.value;
        let descricao = this._inputDescricao.value;
        if (id == '') {
            this._incluiAgenda(nome, descricao);
        }
        else {
            this._alteraAgenda(id, nome, descricao);
        }
    }
    
    cancelar(event) {
        this._limpaFormulario();
        this.mensagem.texto = '';
    }

    _limpaFormulario() {
        this._inputId.value = '';
        this._inputNome.value = '';
        this._inputDescricao.value = '';
        this._inputId.focus();
    }

    _buscaAgendas() {
        let service = new AgendaService();
        service
            .buscar()
            .then(agendas => {
                agendas.forEach(agenda => this._listaAgendas.adiciona(agenda));
                this._mensagem.texto = '';
            })
            .catch(error => this._mensagem.texto = error.message);  
    }

    _incluiAgenda(nome, descricao) {
        let service = new AgendaService();
        service
            .cadastrar(new AgendaDto(nome, descricao))
            .then(agenda => {
                this._listaAgendas.adiciona(agenda);
                this._mensagem.texto = 'Agenda cadastrada com sucesso!';
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error.message);  
    }
    
    _alteraAgenda(id, nome, descricao) {
        let service = new AgendaService();
        service
            .alterar(new AgendaDto(nome, descricao), id)
            .then(agenda => {
                this._listaAgendas.altera(agenda);
                this._mensagem.texto = 'Agenda alterada com sucesso!';
                this._limpaFormulario();
            })
            .catch(error => this._mensagem.texto = error.message);  
    }

    _excluiAgenda(id, nome) {
        let service = new AgendaService();
        service
            .remover(id, nome)
            .then(agenda => {
                this._listaAgendas.remove(id);
                this._mensagem.texto = 'Agenda excluída com sucesso!';
            })
            .catch(error => this._mensagem.texto = error.message);  
    }

}

let agendaController = new AgendaController();

export function agendaControllerInstance() {
    return agendaController;
}
