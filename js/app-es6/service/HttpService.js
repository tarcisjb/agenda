export class HttpService {
    get(url, handler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send();
        });
    }
    post(url, dado, handler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(JSON.stringify(dado));
        });
    }
    put(url, dado, handler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send(JSON.stringify(dado));
        });
    }
    delete(url, handler) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', url);
            xhr.onreadystatechange = () => handler(xhr, resolve, reject);
            xhr.send();
        });
    }
}
