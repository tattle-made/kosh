export default class ExistsResponse {
    public status: boolean;
    public userId: number;

    constructor(status: boolean, userId: number) {
        this.status = status;
        this.userId = userId;
    }
}
