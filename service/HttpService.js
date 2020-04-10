class HttpService {

    /*
        Valores possíveis de 'readyState':

        0: requisição ainda não iniciada
        1: conexão com o servidor estabelecida
        2: requisição recebida
        3: processando requisição
        4: requisição está concluída e a resposta está pronta
    */
   
    get(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else if (xhr.status == 404) {
                        console.log(xhr.responseText);
                        let erroDeApiDto = JSON.parse(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
                    } else {
                        console.log(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, xhr.responseText));
                    }
                }
            }
            xhr.send();
        });
    }

    post(url, dado) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 201) {
                        resolve(JSON.parse(xhr.responseText));
                    } else if (xhr.status == 409) {
                        let erroDeApiDto = JSON.parse(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
                    } else {
                        reject(new XhrErroDto(xhr.status, xhr.responseText));
                    }
                }
            }
            xhr.send(JSON.stringify(dado));
        });
    }

    put(url, dado) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('Content-type','application/json');
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else if ((xhr.status == 404) || (xhr.status == 409)) {
                        console.log(xhr.responseText);
                        let erroDeApiDto = JSON.parse(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
                    } else {
                        console.log(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, xhr.responseText));
                    }
                }
            }
            xhr.send(JSON.stringify(dado));
        });
    }
   
    delete(url) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('DELETE', url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else if (xhr.status == 404) {
                        console.log(xhr.responseText);
                        let erroDeApiDto = JSON.parse(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, `${erroDeApiDto.erro}: ${erroDeApiDto.mensagem}`));
                    } else {
                        console.log(xhr.responseText);
                        reject(new XhrErroDto(xhr.status, xhr.responseText));
                    }
                }
            }
            xhr.send();
        });
    }

}