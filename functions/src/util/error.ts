import Response from './response';

export class ErrorResponse extends Response {
    public code: ErrorCode;

    constructor(code: ErrorCode, msg: String, detail?: String) {
        super(400, msg, detail);
        this.code = code;
    }
}


export enum ErrorCode {
    INVALID_ARGUMENTS  = 1000,
    DB_ERROR = 1001,
    NO_SUCH_PAGE = 1002
}