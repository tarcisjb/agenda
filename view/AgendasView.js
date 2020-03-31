class AgendasView extends View {

    constructor(elemento, paginaHtml) {
        super(elemento);
        this._paginaHtml = paginaHtml;
    }

    template(model) {
        return `
            <table id="tabela-agenda">
                <col id="coluna-nome">
                <col id="coluna-descricao">
                <thead>
                    <tr>
                        <th class="th-agenda">Nome</th>
                        <th class="th-agenda">Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.agendas.map(a => `
                        <tr class="tr-agenda">
                            <td class="td-nome-agenda">
                                ${a.getUrlNome(this._paginaHtml)}
                            </td>
                            <td class="td-descricao-agenda">${a.descricao}</td>
                            <td class="td-id-agenda invisivel">${a.id}</td>
                            <td class="td-alterar-agenda">
                                <button class="btn-alterar">editar</button>
                            </td>
                            <td class="td-excluir-agenda">
                                <button class="btn-excluir">excluir</button>
                            </td>
                        </tr>
                    `).join('')}
                <tbody>
            </table>
        `;
    }

}