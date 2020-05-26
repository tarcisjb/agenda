export class XhrErroDto {
    
    constructor(status, responseText) {
        this._status = status;
        this._responseText = responseText;
    }

    get status() {
        return this._status;
    }

    get responseText() {
        return this._responseText;
    }

}