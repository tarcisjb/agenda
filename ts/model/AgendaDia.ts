export class AgendaDia {

    private _horas: string[];

    constructor(private _dia: Date, private _nome: string) {
        // this._dia = dia;
        // this._nome = nome;
        this._horas = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
        "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
    }

    get dia() {
        return this._dia;
    }

    set dia(dia) {
        this._dia = dia;
    }

    get nome() {
        return this._nome;
    }

    set nome(nome) {
        this._nome = nome;
    }
    
    get horas() {
        return this._horas;
    }
    
}