var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HttpService } from './HttpService.js';
import { Agenda } from '../model/Agenda.js';
import { XhrErroDto } from '../dto/XhrErroDto.js';
export class AgendaService {
    constructor() {
        this._http = new HttpService();
        this._urlAgenda = "https://api-psicologia.herokuapp.com/psicologia/agendas/";
    }
    _buscarOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else if (xhr.status == 404) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            }
            else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }
    buscar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agendas = yield this._http.get(this._urlAgenda, this._buscarOnReadyStateChange);
                return agendas.map((agendaDto) => new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao));
            }
            catch (xhrErroDto) {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "buscar"');
                }
                else {
                    throw new Error('Não foi possível buscar as agendas');
                }
            }
        });
    }
    _detalharOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else if (xhr.status == 404) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            }
            else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }
    detalhar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agendaDetalharDto = yield this._http.get(this._urlAgenda + id, this._detalharOnReadyStateChange);
                return new Agenda(agendaDetalharDto.id, agendaDetalharDto.nome, agendaDetalharDto.descricao);
            }
            catch (xhrErroDto) {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "detalhar"');
                }
                else if (xhrErroDto.status == 404) {
                    throw new Error(xhrErroDto.responseText);
                }
                else {
                    throw new Error('Não foi possível buscar as agendas');
                }
            }
        });
    }
    _cadastrarOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 201) {
                resolve(JSON.parse(xhr.responseText));
            }
            else if (xhr.status == 409) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            }
            else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }
    cadastrar(agendaCadastrarDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agendaDto = yield this._http.post(this._urlAgenda, agendaCadastrarDto, this._cadastrarOnReadyStateChange);
                return new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao);
            }
            catch (xhrErroDto) {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "cadastrar"');
                }
                else {
                    throw new Error(xhrErroDto.responseText);
                }
            }
        });
    }
    _alterarOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
            else if ((xhr.status == 404) || (xhr.status == 409)) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            }
            else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }
    alterar(agendaAlterarDto, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let agendaDto = yield this._http.put(this._urlAgenda + id, agendaAlterarDto, this._alterarOnReadyStateChange);
                return new Agenda(agendaDto.id, agendaDto.nome, agendaDto.descricao);
            }
            catch (xhrErroDto) {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "alterar"');
                }
                else if (xhrErroDto.status == 404) {
                    throw new Error(`Falha ao alterar agenda: Agenda de nome '${agendaAlterarDto.nome}' não encontrada.`);
                }
                else {
                    throw new Error(xhrErroDto.responseText);
                }
            }
        });
    }
    _removerOnReadyStateChange(xhr, resolve, reject) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            }
            else if (xhr.status == 404) {
                console.log(xhr.responseText);
                let erroDeApiDto = JSON.parse(xhr.responseText);
                reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
            }
            else {
                console.log(xhr.responseText);
                reject(new XhrErroDto(xhr.status, xhr.responseText));
            }
        }
    }
    remover(id, nome) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._http.delete(this._urlAgenda + id, this._removerOnReadyStateChange);
            }
            catch (xhrErroDto) {
                if (xhrErroDto.status == 0) {
                    throw new Error('Falha ao enviar requisição para o serviço "alterar"');
                }
                else if (xhrErroDto.status == 404) {
                    throw new Error(`Falha ao excluir agenda: Agenda de nome '${nome}' não encontrada.`);
                }
                else {
                    throw new Error(xhrErroDto.responseText);
                }
            }
        });
    }
}
