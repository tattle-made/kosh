export default class ExistsResponseToken {
    public auth: boolean;
    public userId: number;
    public token: string;
    public role: string;

    constructor(auth: boolean, userId: number, token: string, role: string) {
        this.auth = auth;
        this.userId = userId;
        this.token = token;
        this.role = role;
    }
}
