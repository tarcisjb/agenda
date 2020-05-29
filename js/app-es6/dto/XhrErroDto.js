export class XhrErroDto {
    constructor(_status, _responseText) {
        this._status = _status;
        this._responseText = _responseText;
    }
    get status() {
        return this._status;
    }
    get responseText() {
        return this._responseText;
    }
}
