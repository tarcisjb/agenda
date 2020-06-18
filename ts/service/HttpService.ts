export class HttpService {

    /*
        Valores possíveis de 'readyState':

        0: requisição ainda não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição está concluída e a resposta está pronta
    */
   
    get(url: string, handler: XMLHttpRequestHandler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send();
        });
    }

    post(url: string, dado: any, handler: XMLHttpRequestHandler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(JSON.stringify(dado));
        });
    }

    put(url: string, dado: any, handler: XMLHttpRequestHandler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(JSON.stringify(dado));
        });
    }
   
    delete(url: string, handler: XMLHttpRequestHandler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send();
        });
    }

}

export interface XMLHttpRequestHandler {

    (xhr: XMLHttpRequest, resolve: Function, reject: Function): void
}
