import {HttpService} from '../service/HttpService.js';
import {Agenda} from '../model/Agenda.js';

export class AgendaService {

    constructor() {
        this._http = new HttpService();
        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
    }

    buscar() {
        return this._http
            .get(this._urlAgenda)
            .then(agendas => {
                return agendas.map(agendaDto => new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao));
            })
            .catch(xhrErroDto => {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "buscar"');
                } else {
                    throw new Error('Não foi possível buscar as agendas');
                }
            })
    }

    detalhar(id) {
        return this._http
            .get(this._urlAgenda + id)
            .then(agendaDetalharDto => {
                return new Agenda(agendaDetalharDto.id, agendaDetalharDto.nome, agendaDetalharDto.descricao);
            })
            .catch(xhrErroDto => {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "detalhar"');
                } else if (xhrErroDto.status == 404) {
                    throw new Error(xhrErroDto.responseText);
                } else {
                    throw new Error('Não foi possível buscar as agendas');
                }
            })
    }

    cadastrar(agendaDto) {
        return this._http
            .post(this._urlAgenda, agendaDto)
            .then(agendaDto => {
                return new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao);
            })
            .catch(xhrErroDto => {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "cadastrar"');
                } else {
                    throw new Error(xhrErroDto.responseText);
                }
            })
    }

    alterar(agendaDto, id) {
        return this._http
            .put(this._urlAgenda + id, agendaDto)
            .then((agendaDto) => {
                return new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao);
            })
            .catch(xhrErroDto => {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "alterar"');
                } else if (xhrErroDto.status == 404) {
                    throw new Error(`Falha ao alterar agenda: Agenda de nome '${agendaDto.nome}' não encontrada.`);
                } else {
                    throw new Error(xhrErroDto.responseText);
                }
            })
    }

    remover(id, nome) {
        return this._http
            .delete(this._urlAgenda + id)
            .then(() => {
                return '';
            })
            .catch(xhrErroDto => {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "alterar"');
                } else if (xhrErroDto.status == 404) {
                    throw new Error(`Falha ao excluir agenda: Agenda de nome '${nome}' não encontrada.`);
                } else {
                    throw new Error(xhrErroDto.responseText);
                }
            })
    }

}