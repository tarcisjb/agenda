export class DateHelper {

    constructor() {
        throw new Error('Esta classe não pode ser instanciada');
    }

    static textoParaData(texto: string): Date {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(texto))
            throw new Error('Deve estar no formato aaaa-mm-dd');

        return new Date(texto.split('-').toString());
//        return new Date(...texto.split('-').map((item,indice) => item - indice % 2));
    }

    static dataParaTexto(data: Date): string {
        return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
    }

    static adicionaDias(data: Date, dias: number): Date {
//        return new Date(data.getTime() + (dias * 24 * 60 * 60 * 1000));
        data.setDate(data.getDate()+dias);
        return data;
    }

    static strDiaSemana(data: Date): string {
        let diasSemana = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"];
        return diasSemana[data.getDay()];
    }

    static numDiaSemana(data: Date): number {
        return data.getDate();
    }

}