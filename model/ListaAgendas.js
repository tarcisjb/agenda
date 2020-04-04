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

    altera(agenda) {
        this._agendas.map(a => {
           if (a.id == agenda.id) {
               a.nome = agenda.nome;
               a.descricao = agenda.descricao;
           }
        })
    }
}