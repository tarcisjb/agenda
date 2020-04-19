import {currentInstance2} from './controller/AgendaDiaController.js';

let agendaDiaController = currentInstance2();

document.querySelector('#hoje').onclick = agendaDiaController.diaCorrente.bind(agendaDiaController);
document.querySelector('#anterior').onclick = agendaDiaController.diaAnterior.bind(agendaDiaController);
document.querySelector('#proximo').onclick = agendaDiaController.proximoDia.bind(agendaDiaController);
document.querySelector('#data-corrente').onchange = agendaDiaController.atualizaData.bind(agendaDiaController);