export class UserCreateRequest {
    public username: string;
    public password: string;
    public email: string;
    public role: string;

    constructor(param: any) {
        this.username = param.username;
        this.password = param.password;
        this.email = param.email;
        this.role = param.role;
    }

    public getAll() {
        return {
            username: this.username,
            password: this.password,
            email: this.email,
            role: this.role,
        };
    }
}
