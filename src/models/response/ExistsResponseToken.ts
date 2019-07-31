export default class ExistsResponseToken {
    public auth: boolean;
    public userId: number;
    public token: string;

    constructor(auth: boolean, userId: number, token: string) {
        this.auth = auth;
        this.userId = userId;
        this.token = token;
    }
}
