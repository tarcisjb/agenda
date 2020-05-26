export class AgendaDto {

    // Como AgendaDto é passado em requisições do tipo POST os nomes dos atributos não podem
    // seguir a convenção de ter um underscore como primeiro caracter
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }

}
