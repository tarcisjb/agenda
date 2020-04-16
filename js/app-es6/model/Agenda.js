class Agenda {

    constructor(id, nome, descricao) {
        this._id = id;
        this._nome = nome;
        this._descricao = descricao;
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
}