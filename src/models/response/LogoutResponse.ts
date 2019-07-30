import BaseServerResponse from './BaseServerResponse';

export default class LogoutResponse extends BaseServerResponse {
    private numOfRows: number;
    constructor(numOfRows: number) {
        super();
        this.numOfRows = numOfRows;
    }

    public static create(numOfRows: number): LogoutResponse {
        return new LogoutResponse(numOfRows);
    }

    public get(): object {
        return this.getResponse({
            message: `${this.numOfRows} rows were deleted`
        });
    }
}
