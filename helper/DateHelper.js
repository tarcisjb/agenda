class DateHelper {

    static diasSemana = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"];

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static textoParaData(texto) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('Deve estar no formato aaaa-mm-dd');

        return new Date(texto.split('-'));
//        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
    }

    static dataParaTexto(data) {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static adicionaDias(data, dias) {
        return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    }

    static strDiaSemana(data) {
        return DateHelper.diasSemana[data.getDay()];
    }

    static numDiaSemana(data) {
        return data.getDate();
    }

}