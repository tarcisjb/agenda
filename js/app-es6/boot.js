import {agendaControllerInstance} from './controller/AgendaController.js';

let agendaController = agendaControllerInstance();

document.querySelector('.form').onsubmit = agendaController.gravar.bind(agendaController);
document.querySelector('#botao-cancelar').onclick = agendaController.cancelar.bind(agendaController);