class Intervalo {
    
    constructor(id, data, horaInicio, duracao) {
        this._id = id;
        this._data = data;
        this._horaInicio = horaInicio;
        this._duracao = duracao;
        this._eventos = [];
    }

    get id() {
        return this._id;
    }

    get data() {
        return this._data;
    }
    
    get horaInicio() {
        return this._horaInicio;
    }

    get duracao() {
        return this._duracao;
    }

    get eventos() {
        return [].concat(this._eventos);
    }

    adicionaEvento(evento) {
        this._eventos.push(evento);
    }

    alteraEvento(evento) {
        this._eventos.map(e => {
           if (e.id == evento.id) {
               e.nome = evento.nome;
               e.descricao = evento.descricao;
           }
        })
    }

}