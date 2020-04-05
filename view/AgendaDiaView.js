class AgendaDiaView extends View {

    template(model) {
        return `
            <table class="tabela-diaria">
                <col id="coluna-hora">
                <col id="coluna-compromisso">
                <thead>
                    <tr>
                        <th class="th-diaria">Hora</th>
                        <th class="th-diaria">${DateHelper.strDiaSemana(model.dia)}. ${model.dia.getDate()}</th>
                    </tr>
                </thead>
                <tbody>
                    ${model.horas.map(hora => `
                        <tr class="tr-diaria">
                            <td class="td-diaria">${hora}</td>
                            <td class="td-diaria">
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

}