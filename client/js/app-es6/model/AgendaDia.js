export class AgendaDia {

    constructor(dia) {
        this._dia = dia;
        this._horas = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
        "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
//        this._listaIntervalos = this._criaListaIntervalos();
    }

    get dia() {
        return this._dia;
    }

    set dia(dia) {
        this._dia = dia;
    }

    get horas() {
        return this._horas;
    }
/*
    _criaListaIntervalos(numIntervalos) {
        let listaIntervalos = [];
        this._horas.forEach()
        for (let i=0;i < numIntervalos;i++) {
            listaIntervalos.push(new Intervalo(++Intervalo.contador, this._dia, horaInicio, duracao));
            horaInicio += duracao;
        }
        return listaIntervalos;
    }
*/
    adicionaEvento() {
        
    }
    
}