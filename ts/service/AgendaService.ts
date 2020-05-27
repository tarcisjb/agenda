import {HttpService} from './HttpService.js';
import {Agenda} from '../model/Agenda.js';
import {XhrErroDto} from '../dto/XhrErroDto.js';
import {AgendaDto} from '../dto/AgendaDto.js';
import {AgendaDetalharDto} from '../dto/AgendaDetalharDto.js';

export class AgendaService {

    private _http: HttpService;
    private _urlAgenda: string;

    constructor() {
        this._http = new HttpService();
//        this._urlAgenda = "http://localhost:8080/psicologia/agendas/";
        this._urlAgenda = "https://api-psicologia.herokuapp.com/psicologia/agendas/";
    }

    _buscarOnReadyStateChange(xhr: XMLHttpRequest, resolve: Function, reject: Function): void {
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

    buscar(): Promise<Agenda[]> {
        return this._http
            .get(this._urlAgenda, this._buscarOnReadyStateChange)
            .then((agendas: AgendaDto[]) => {
                return agendas.map((agendaDto: AgendaDto) => new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao));
            })
            .catch(xhrErroDto => {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "buscar"');
                } else {
                    throw new Error('Não foi possível buscar as agendas');
                }
            })
    }

    _detalharOnReadyStateChange(xhr: XMLHttpRequest, resolve: Function, reject: Function): void {
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

    detalhar(id: number): Promise<Agenda> {
        return this._http
            .get(this._urlAgenda + id, this._detalharOnReadyStateChange)
            .then((agendaDetalharDto: AgendaDetalharDto) => {
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

    _cadastrarOnReadyStateChange(xhr: XMLHttpRequest, resolve: Function, reject: Function): void {
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

    cadastrar(agendaDto: AgendaDto): Promise<Agenda> {
        return this._http
            .post(this._urlAgenda, agendaDto, this._cadastrarOnReadyStateChange)
            .then((agendaDto: AgendaDto) => {
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

    _alterarOnReadyStateChange(xhr: XMLHttpRequest, resolve: Function, reject: Function): void {
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

    alterar(agendaDto: AgendaDto, id: number): Promise<Agenda> {
        return this._http
            .put(this._urlAgenda + id, agendaDto, this._alterarOnReadyStateChange)
            .then((agendaDto: AgendaDto) => {
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

    _removerOnReadyStateChange(xhr: XMLHttpRequest, resolve: Function, reject: Function): void {
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

    remover(id: number, nome: string) {
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