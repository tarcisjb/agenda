export class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {
                if ((props.indexOf(prop) == -1) && ProxyFactory._ehFuncao(target[prop])) {
                    return function () {
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    };
                }
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if (props.indexOf(prop) == -1) {
                    acao(target);
                }
                return retorno;
            }
        });
    }
    static _ehFuncao(func) {
        return typeof (func) == typeof (Function);
    }
}
