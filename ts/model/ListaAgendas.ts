import {Agenda} from './Agenda.js';

export class ListaAgendas {

    private _agendas: Agenda[];

    constructor() {
        this._agendas = [];
    }

    adiciona(agenda: Agenda) {
        this._agendas.push(agenda);
    }

    get agendas() {
        return ([] as Agenda[]).concat(this._agendas);
    }

    remove(idAgenda: number) {
        this._agendas = this._agendas.filter(a => a.id != idAgenda);
    }

    altera(agenda: Agenda) {
        this._agendas.map(a => {
           if (a.id == agenda.id) {
               a.nome = agenda.nome;
               a.descricao = agenda.descricao;
           }
        })
    }
}