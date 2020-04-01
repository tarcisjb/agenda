class ListaAgendas {

    constructor() {
        this._agendas = [];
    }

    adiciona(agenda) {
        this._agendas.push(agenda);
    }

    get agendas() {
        return [].concat(this._agendas);
    }

    remove(idAgenda) {
        this._agendas = this._agendas.filter(a => a.id != idAgenda);
    }

}