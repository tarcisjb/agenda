import {View} from './View.js';
import {agendaDiaControllerInstance} from '../controller/AgendaDiaController.js';

export class CabecalhoAgendaView extends View {

    constructor(elemento) {
        super(elemento);
        elemento.addEventListener('click', function(event) {
            if (event.target.id == 'hoje') {
                agendaDiaControllerInstance().diaCorrente();
            } else if (event.target.id == 'anterior') {
                agendaDiaControllerInstance().diaAnterior();
            } else if (event.target.id == 'proximo') {
                agendaDiaControllerInstance().proximoDia();
            } else if (event.target.id == 'voltar') {
                agendaDiaControllerInstance().voltar();
            }
        });
        elemento.addEventListener('change', function(event) {
            if (event.target.id == 'data-corrente') {
                agendaDiaControllerInstance().atualizaData(event.target.value.split('-'));
            }
        });
    }

    template(model) {
        return `
            <label id="nome-agenda">${model.nome}</label>
            <button id="hoje">Hoje</button>
            <button id="anterior">&#60;</button>
            <button id="proximo">&#62;</button>
            <input id="data-corrente" type="date" value="${model.dia.toISOString().substr(0, 10)}">
            <button id="voltar">Voltar</button>
        `;
    }

}