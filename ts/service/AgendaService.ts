import {HttpService} from './HttpService.js';
import {Agenda} from '../model/Agenda.js';
import {XhrErroDto} from '../dto/XhrErroDto.js';

export class AgendaService {

    constructor() {
        this._http = new HttpService();
//        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._urlAgenda = "https://api-psicologia.herokuapp.com/psicologia/agendas/";
    }

    _buscarOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else if (xhr.status == 404) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            } else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }

    buscar() {
        return this._http
            .get(this._urlAgenda, this._buscarOnReadyStateChange)
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

    _detalharOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else if (xhr.status == 404) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            } else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }

    detalhar(id) {
        return this._http
            .get(this._urlAgenda + id, this._detalharOnReadyStateChange)
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

    _cadastrarOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 201) {
                resolve(JSON.parse(xhr.responseText));
            } else if (xhr.status == 409) {
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            } else {
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }

    cadastrar(agendaDto) {
        return this._http
            .post(this._urlAgenda, agendaDto, this._cadastrarOnReadyStateChange)
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

    _alterarOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            } else if ((xhr.status == 404) || (xhr.status == 409)) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            } else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }

    alterar(agendaDto, id) {
        return this._http
            .put(this._urlAgenda + id, agendaDto, this._alterarOnReadyStateChange)
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

    _removerOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else if (xhr.status == 404) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            } else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }

    remover(id, nome) {
        return this._http
            .delete(this._urlAgenda + id, this._removerOnReadyStateChange)
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