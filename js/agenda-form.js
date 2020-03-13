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

class AgendaDto {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
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

function insereAgenda(agendaDto) {
    console.log(agendaDto);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:8080/psicologia/agendas");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 201) {
            erroAjax.classList.add("invisivel");
            window.alert("Agenda cadastrada com sucesso!");
            window.location.replace("index.html");
        }
        else if (xhr.status == 409) {
            erroAjax.classList.remove("invisivel");
            window.alert("Já existe uma agenda com este nome!");
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send(JSON.stringify(agendaDto));
}

function alteraAgenda(id, agendaDto) {
    console.log(agendaDto);
    var xhr = new XMLHttpRequest();
    xhr.open("PUT","http://localhost:8080/psicologia/agendas/" + id);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        var erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            window.alert("Agenda alterada com sucesso!");
            window.location.replace("index.html");
        }
        else if (xhr.status == 409) {
            erroAjax.classList.remove("invisivel");
            window.alert("Já existe uma agenda com este nome!");
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send(JSON.stringify(agendaDto));
}
