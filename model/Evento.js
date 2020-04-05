class Evento {

    static contador = 0;
    
    constructor(id, data, horaInicio, horaFim, titulo, descricao) {
        this._id = id;
        this._data = data;
        this._horaInicio = horaInicio;
        this._horaFim = horaFim;
        this._titulo = titulo;
        this._descricao = descricao;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get data() {
        return this._data;
    }

    set data(data) {
        this._data = data;
    }

    get horaInicio() {
        return this._horaInicio;
    }

    set horaInicio(horaInicio) {
        this._horaInicio = horaInicio;
    }

    get horaFim() {
        return this._horaFim;
    }

    set horaFim(horaFim) {
        this._horaFim = horaFim;
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(titulo) {
        this._titulo = titulo;
    }

    get descricao() {
        return this._descricao;
    }

    set descricao(descricao) {
        this._descricao = descricao;
    }

}