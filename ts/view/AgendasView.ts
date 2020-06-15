import {View} from './View.js';
import {agendaControllerInstance} from '../controller/AgendaController.js';
import {ListaAgendas} from '../model/ListaAgendas.js';

export class AgendasView extends View<ListaAgendas> {

    constructor(seletor: string, private _paginaHtml: string) {
        super(seletor);
        $(seletor).on("click", function(event: Event) {
            if ((<HTMLInputElement>event.target).classList.contains('btn-alterar')) {
                let idAgenda = (<HTMLInputElement>event.target).closest('#td-id-agenda').textContent;
                let nomeAgenda = (<HTMLInputElement>event.target).closest('#td-nome-agenda').textContent;
                let descricaoAgenda = (<HTMLInputElement>event.target).closest('#td-descricao-agenda').textContent;
                if (idAgenda && nomeAgenda && descricaoAgenda) {
                    agendaControllerInstance().alteraAgenda(parseInt(idAgenda), nomeAgenda, descricaoAgenda);
                }
            } else if ((<HTMLInputElement>event.target).classList.contains('btn-excluir')) {
                let idAgenda = (<HTMLInputElement>event.target).closest('#td-id-agenda').textContent;
                let nomeAgenda = (<HTMLInputElement>event.target).closest('#td-nome-agenda').textContent;
                if (idAgenda && nomeAgenda) {
                    agendaControllerInstance().excluiAgenda(parseInt(idAgenda), nomeAgenda);
                }
            }
        })
    }

    template(model: ListaAgendas) {
        return `
            <table id="tabela-agenda">
                <col id="coluna-nome">
                <col id="coluna-descricao">
                <col id="coluna-alterar">
                <col id="coluna-excluir">

                <thead>
                    <tr>
                        <th class="th-agenda">Nome</th>
                        <th class="th-agenda">Descrição</th>
                        <th class="th-agenda"></th>
                        <th class="th-agenda"></th>
                    </tr>
                </thead>
                <tbody>
                    ${model.agendas.map(a => `
                        <tr class="tr-agenda">
                            <td class="td-nome-agenda">
                                ${a.getUrlNome(this._paginaHtml)}
                            </td>
                            <td class="td-id-agenda invisivel">${a.id}</td>
                            <td class="td-nome-agenda invisivel">${a.nome}</td>
                            <td class="td-descricao-agenda">${a.descricao}</td>
                            <td class="td-alterar-agenda">
                                <button class="btn-alterar"">Alterar</button>
                            </td>
                            <td class="td-excluir-agenda">
                                <button class="btn-excluir">Excluir</button>
                            </td>
                        </tr>
                    `).join('')}
                <tbody>
            </table>
        `;
    }

}