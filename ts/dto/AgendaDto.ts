export class AgendaDto {

    public id: number;
    // Como AgendaDto é passado em requisições do tipo POST os nomes dos atributos não podem
    // seguir a convenção de ter um underscore como primeiro caracter
    constructor(public nome: string, public descricao: string) {
        // this.id = id;
        // this.nome = nome;
        // this.descricao = descricao;
    }

}
