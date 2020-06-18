import {ProxyFactory} from '../service/ProxyFactory.js';
import {View} from '../view/View.js';

export class Bind<T> {

    constructor(model: T, view: View<T>, ...props: string[]) {
        let proxy = ProxyFactory.create(model, props, (model: T) => {
            view.update(model)
        });
        view.update(model);
        return proxy;
     }

}
