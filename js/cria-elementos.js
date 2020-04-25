
function criaOption(texto, classe) {
    var option =  document.createElement("option");
    if (classe != "") {
        option.classList.add(classe);
    }
    option.textContent = texto;
    return option;
}

function criaThead(classe) {
    var thead = document.createElement("thead");
    if (classe != "") {
        thead.classList.add(classe);
    }
    return thead;
}

function criaTr(classe) {
    var tr = document.createElement("tr");
    if (classe != "") {
        tr.classList.add(classe);
    }
    return tr;
}

function criaTd(texto, classe) {
    var td = document.createElement("td");
    if (classe != "") {
        td.classList.add(classe);
    }
    td.textContent = texto;
    return td;
}

function criaTh(texto, classe) {
    var th = document.createElement("th");
    if (classe != "") {
        th.classList.add(classe);
    }
    th.textContent = texto;
    return th;
}

function criaA(href, texto) {
    var a = document.createElement("a");
    a.setAttribute("href", href);
    a.textContent = texto;
    return a;
}

function criaButton(texto, classe) {
    var button = document.createElement("button");
    if (classe != "") {
        button.classList.add(classe);
    }
    button.textContent = texto;
    return button;
}