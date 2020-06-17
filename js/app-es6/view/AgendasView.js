import { View } from './View.js';
import { agendaControllerInstance } from '../controller/AgendaController.js';
export class AgendasView extends View {
    constructor(seletor, _paginaHtml) {
        super(seletor);
        this._paginaHtml = _paginaHtml;
        $(seletor).on("click", function (event) {
            if (event.target.classList.contains('btn-alterar')) {
                let idAgenda = event.target.closest('.tr-agenda').children[1].textContent;
                let nomeAgenda = event.target.closest('.tr-agenda').children[2].textContent;
                let descricaoAgenda = event.target.closest('.tr-agenda').children[3].textContent;
                if (idAgenda && nomeAgenda && descricaoAgenda) {
                    agendaControllerInstance().alteraAgenda(parseInt(idAgenda), nomeAgenda, descricaoAgenda);
                }
            }
            else if (event.target.classList.contains('btn-excluir')) {
                let idAgenda = event.target.closest('.tr-agenda').children[1].textContent;
                let nomeAgenda = event.target.closest('.tr-agenda').children[2].textContent;
                if (idAgenda && nomeAgenda) {
                    agendaControllerInstance().excluiAgenda(parseInt(idAgenda), nomeAgenda);
                }
            }
        });
    }
    template(model) {
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
                                <button class="btn-alterar">Alterar</button>
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
