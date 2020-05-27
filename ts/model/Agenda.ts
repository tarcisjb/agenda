export class Agenda {

    constructor(private _id: number, private _nome: string, private _descricao: string) {
        // this._id = id;
        // this._nome = nome;
        // this._descricao = descricao;
    }

    get id(): number {
        return this._id;
    }

    get nome(): string {
        return this._nome;
    }    

    set nome(nome: string) {
        this._nome = nome;
    }

    get descricao(): string {
        return this._descricao;
    }
    
    set descricao(descricao: string) {
        this._descricao = descricao;
    }
    
    getUrlNome(paginaHtml: string): string {
        return `
            <a href="${paginaHtml}?id=${this._id}">${this._nome}</a>
        `;
    }
}