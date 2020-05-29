export class DateHelper {
    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }
    static textoParaData(texto) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('Deve estar no formato aaaa-mm-dd');
        return new Date(texto.split('-').toString());
    }
    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
    static adicionaDias(data, dias) {
        data.setDate(data.getDate() + dias);
        return data;
    }
    static strDiaSemana(data) {
        let diasSemana = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
        return diasSemana[data.getDay()];
    }
    static numDiaSemana(data) {
        return data.getDate();
    }
}
