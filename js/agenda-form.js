// modo de inserção do formulário
const modoInsercao = "i";
const modoAlteracao = "a";

class Formulario {
    constructor() {
    }

    getModo() {
        return this.modo;
    }

    setModo(modo) {
        this.modo = modo;
        var botaoGravar = document.querySelector("#botao-gravar");
        if (modo == modoInsercao) {
            this.setTitulo("Nova Agenda");
            botaoGravar.addEventListener("click", inserir);
        }
        else if (modo = modoAlteracao) {
            this.setTitulo("Altera Agenda");
            botaoGravar.addEventListener("click", alterar);
        }
    }

    setTitulo(titulo) {
        this.titulo = titulo;
        var title = document.querySelector("title");
        title.textContent = titulo;
        var h1 = document.querySelector(".titulo");
        h1.textContent = titulo;
    }

    setId(id) {
        this.id = id;
        var idAgenda = document.querySelector("#id");
        idAgenda.value = id;
    }

    setNome(nome) {
        this.nome = nome;
        var nomeAgenda = document.querySelector("#nome");
        nomeAgenda.value = nome;
    }

    setDescricao(descricao) {
        this.descricao = descricao;
        var descricaoAgenda = document.querySelector("#descricao");
        descricaoAgenda.value = descricao;
    }
}

var formulario = new Formulario();

window.onload = inicializa;

function inicializa() {
    var agenda = recuperaParametros();
    var botaoCancelar = document.querySelector("#botao-cancelar");
    botaoCancelar.addEventListener("click", () => {
        console.log("Clicou no botão cancelar");
        window.location.replace("index.html");
    }); 
}

function inserir(event) {
    event.preventDefault();
    var nome = document.querySelector("#nome").value;
    var descricao = document.querySelector("#descricao").value;
    var agendaDto = new AgendaDto(nome, descricao);
    insereAgenda(agendaDto);
}

function alterar(event) {
    event.preventDefault();
    var nome = document.querySelector("#nome").value;
    var descricao = document.querySelector("#descricao").value;
    var agendaDto = new AgendaDto(nome, descricao);
    alteraAgenda(formulario.id, agendaDto);
}

function recuperaParametros() {
    var query = location.search.slice(1);
    if (query == "") {
        formulario.setModo(modoInsercao);
    }
    else {
        var partes = query.split('&');
        var mapa = {};
        partes.forEach(function (parte) {
            var chaveValor = parte.split('=');
            var chave = chaveValor[0];
            var valor = chaveValor[1];
            mapa[chave] = valor;
        });  
        formulario.setModo(modoAlteracao);
        formulario.setId(mapa["id"]);
        formulario.setNome(decodeURI(mapa["nome"]));
        formulario.setDescricao(decodeURI(mapa["descricao"]));
    }
}
