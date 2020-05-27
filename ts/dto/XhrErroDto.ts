export class XhrErroDto {
    
    constructor(private _status: number, private _responseText: string) {
        // this._status = status;
        // this._responseText = responseText;
    }

    get status(): number {
        return this._status;
    }

    get responseText(): string {
        return this._responseText;
    }

}