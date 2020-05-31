import { agendaControllerInstance } from './controller/AgendaController.js';
let agendaController = agendaControllerInstance();
$('.form').on("submit", function (event) {
    agendaController.gravar(event);
});
$('#botao-cancelar').on("click", function (event) {
    agendaController.cancelar(event);
});
