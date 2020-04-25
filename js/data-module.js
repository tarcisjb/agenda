const urlAgenda = "http://localhost:8080/psicologia/agendas";

function buscaAgenda(idAgenda) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", urlAgenda + "/" + idAgenda);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.addEventListener("load", function() {
        let erroAjax = document.querySelector("#erro-ajax");
        if (xhr.status == 200) {
            erroAjax.classList.add("invisivel");
            let agenda = JSON.parse(this.responseText);
            setNomeAgenda(agenda.nome);
            console.log("setou o nome da agenda");
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
    xhr.send();
}
