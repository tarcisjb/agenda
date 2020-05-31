export class ProxyFactory {

    static create(objeto: any, props: string[], acao: Function) {
        return new Proxy(objeto, {
            get(target: any, prop: string, receiver: any) {
                if(props.toString().includes(prop) && ProxyFactory._ehFuncao(target[prop])) {
                    return function() {
                        //console.log(`a propriedade "${prop}" foi interceptada`);
                        let retorno = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return retorno;
                    }
                }
                return Reflect.get(target, prop, receiver);       
            },
            set(target: any, prop: string, value: any, receiver: any) {
                let retorno = Reflect.set(target, prop, value, receiver);
                if(props.toString().includes(prop)) {
                    acao(target);    
                }
                return retorno;
            }
        })
    }

    static _ehFuncao(func: any) {
        return typeof(func) == typeof(Function);
    }
    
}