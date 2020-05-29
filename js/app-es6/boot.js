import { agendaControllerInstance } from './controller/AgendaController.js';
let agendaController = agendaControllerInstance();
$('.form').submit = agendaController.gravar.bind(agendaController);
$('#botao-cancelar').click = agendaController.cancelar.bind(agendaController);
