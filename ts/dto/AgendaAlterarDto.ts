export class AgendaAlterarDto {

    // Como AgendaAlterarDto é passado em requisições do tipo PUT os nomes dos atributos não podem
    // seguir a convenção de ter um underscore como primeiro caracter
    constructor(public nome: string, public descricao: string) {}

}
