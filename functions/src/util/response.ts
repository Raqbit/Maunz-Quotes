export default class Response {
    public status: number;
    public msg: String;
    public detail: String;

    constructor(status, msg, detail?) {
        this.status = status;
        this.msg = msg;
        this.detail = detail;
    }
}