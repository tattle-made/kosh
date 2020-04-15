export default class ExistsResponse {
    public status: boolean;
    public userId: number;
    public role: string;

    constructor(status: boolean, userId: number, role: string) {
        this.status = status;
        this.userId = userId;
        this.role = role;
    }
}
