import {HttpService} from './HttpService.js';
import {Agenda} from '../model/Agenda.js';
import {XhrErroDto} from '../dto/XhrErroDto.js';
import {AgendaDto} from '../dto/AgendaDto.js';
import {AgendaDetalharDto} from '../dto/AgendaDetalharDto.js';
import {AgendaCadastrarDto} from '../dto/AgendaCadastrarDto.js';
import {AgendaAlterarDto} from '../dto/AgendaAlterarDto.js';

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

    async buscar(): Promise<Agenda[]> {
        try {
            let agendas = <AgendaDto[]> await this._http.get(this._urlAgenda, this._buscarOnReadyStateChange);
            return agendas.map((agendaDto: AgendaDto) => new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao));
        } catch (xhrErroDto) {
            if (xhrErroDto.status == 0) {
                throw new Error('Falha ao enviar requisição para o serviço "buscar"');
            } else {
                throw new Error('Não foi possível buscar as agendas');
            }
        }
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

    async detalhar(id: number): Promise<Agenda> {
        try {
            let agendaDetalharDto = <AgendaDetalharDto> await this._http.get(this._urlAgenda + id, this._detalharOnReadyStateChange);
            return new Agenda(agendaDetalharDto.id, agendaDetalharDto.nome, agendaDetalharDto.descricao);
        } catch (xhrErroDto) {
            if (xhrErroDto.status == 0) {
                throw new Error('Falha ao enviar requisição para o serviço "detalhar"');
            } else if (xhrErroDto.status == 404) {
                throw new Error(xhrErroDto.responseText);
            } else {
                throw new Error('Não foi possível buscar as agendas');
            }
        }
    }

    _cadastrarOnReadyStateChange(xhr: XMLHttpRequest, resolve: Function, reject: Function): void {
        if (xhr.readyState == 4) {
            if (xhr.status == 201) {
                resolve(JSON.parse(xhr.responseText));
            } else if (xhr.status == 409) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            } else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }

    async cadastrar(agendaCadastrarDto: AgendaCadastrarDto): Promise<Agenda> {
        try {
            let agendaDto = <AgendaDto> await this._http.post(this._urlAgenda, agendaCadastrarDto, this._cadastrarOnReadyStateChange);
            return new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao);
        } catch(xhrErroDto) {
            if (xhrErroDto.status == 0) {
                throw new Error('Falha ao enviar requisição para o serviço "cadastrar"');
            } else {
                throw new Error(xhrErroDto.responseText);
            }
        }
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

    async alterar(agendaAlterarDto: AgendaAlterarDto, id: number): Promise<Agenda> {
        try {
            let agendaDto = <AgendaDto> await this._http.put(this._urlAgenda + id, agendaAlterarDto, this._alterarOnReadyStateChange);
            return new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao);
        } catch (xhrErroDto) {
            if (xhrErroDto.status == 0) {
                throw new Error('Falha ao enviar requisição para o serviço "alterar"');
            } else if (xhrErroDto.status == 404) {
                throw new Error(`Falha ao alterar agenda: Agenda de nome '${agendaAlterarDto.nome}' não encontrada.`);
            } else {
                throw new Error(xhrErroDto.responseText);
            }
        }
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

    async remover(id: number, nome: string): Promise<void> {
        try {
            await this._http.delete(this._urlAgenda + id, this._removerOnReadyStateChange);
        } catch (xhrErroDto) {
            if (xhrErroDto.status == 0) {
                throw new Error('Falha ao enviar requisição para o serviço "alterar"');
            } else if (xhrErroDto.status == 404) {
                throw new Error(`Falha ao excluir agenda: Agenda de nome '${nome}' não encontrada.`);
            } else {
                throw new Error(xhrErroDto.responseText);
            }
        }
    }

}