window.onload = inicializa;

class AgendaCadastrarDto {
    constructor(nome, descricao) {
        this.nome = nome;
        this.descricao = descricao;
    }
}

function inicializa() {
    var botaoGravar = document.querySelector("#botao-gravar");
    botaoGravar.addEventListener("click", (event) => {
        event.preventDefault();
        var nome = document.querySelector("#nome").value;
        var descricao = document.querySelector("#descricao").value;
        var agendaCadastrarDto = new AgendaCadastrarDto(nome, descricao);
        gravaAgenda(agendaCadastrarDto);
    }); 
    var botaoCancelar = document.querySelector("#botao-cancelar");
    botaoCancelar.addEventListener("click", () => {
        console.log("Clicou no botão cancelar");
        window.location.replace("index.html");
    }); 
}

function gravaAgenda(agendaCadastrarDto) {
    console.log(agendaCadastrarDto);
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
        else if (xhr.status == 400) {
            erroAjax.classList.remove("invisivel");
            window.alert("Já existe uma agenda com este nome!");
        }
        else {
            console.log(xhr.status);
            console.log(xhr.responseText);
            erroAjax.classList.remove("invisivel");
        }
    });
    xhr.send(JSON.stringify(agendaCadastrarDto));
}
