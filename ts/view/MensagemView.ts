import {View} from './View.js';
import {Mensagem} from '../model/Mensagem.js';

export class MensagemView extends View<Mensagem> {

    template(model: Mensagem) {
        return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : '<p></p>';
    }

}