import {View} from './View.js';
import {agendaDiaControllerInstance} from '../controller/AgendaDiaController.js';
import {AgendaDia} from '../model/AgendaDia.js';
import {DateHelper} from '../helper/DateHelper.js';

export class CabecalhoAgendaView extends View<AgendaDia> {

    constructor(seletor: string) {
        super(seletor);
        $(seletor).on("click", function(event: Event) {
            if ((<HTMLInputElement>event.target).id == 'hoje') {
                agendaDiaControllerInstance().diaCorrente();
            } else if ((<HTMLInputElement>event.target).id == 'anterior') {
                agendaDiaControllerInstance().diaAnterior();
            } else if ((<HTMLInputElement>event.target).id == 'proximo') {
                agendaDiaControllerInstance().proximoDia();
            } else if ((<HTMLInputElement>event.target).id == 'voltar') {
                agendaDiaControllerInstance().voltar();
            }
        });
        $(seletor).on("change", function(event: Event) {
            if ((<HTMLInputElement>event.target).id == 'data-corrente') {
                agendaDiaControllerInstance().atualizaData(DateHelper.textoParaData((<HTMLInputElement>event.target).value));
            }
        });
    }

    template(model: AgendaDia) {
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