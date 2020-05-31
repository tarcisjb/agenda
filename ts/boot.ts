import {agendaControllerInstance} from './controller/AgendaController.js';

let agendaController = agendaControllerInstance();

//document.querySelector('.form').onsubmit = agendaController.gravar.bind(agendaController);
//$('.form').submit = agendaController.gravar.bind(agendaController);
$('.form').on("submit", function(event: Event) {
    agendaController.gravar(event);
});
//document.querySelector('#botao-cancelar').onclick = agendaController.cancelar.bind(agendaController);
//$('#botao-cancelar').click = agendaController.cancelar.bind(agendaController);
$('#botao-cancelar').on("click", function(event: Event) {
    agendaController.cancelar(event);
});