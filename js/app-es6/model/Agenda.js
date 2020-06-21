export class Agenda {
    constructor(_id, _nome, _descricao) {
        this._id = _id;
        this._nome = _nome;
        this._descricao = _descricao;
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    set nome(nome) {
        this._nome = nome;
    }
    get descricao() {
        return this._descricao;
    }
    set descricao(descricao) {
        this._descricao = descricao;
    }
    getUrlNome(paginaHtml) {
        return `
            <a href="${paginaHtml}?id=${this._id}">${this._nome}</a>
        `;
    }
    toString() {
        return JSON.stringify(this);
    }
}
