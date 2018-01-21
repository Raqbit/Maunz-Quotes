import Response from './response';

export default class SuccessResponse extends Response {
    public data: any;

    constructor(msg, data?, status = 200, detail?) {
        super(status, msg, detail);
        this.data = data;
    }
}
