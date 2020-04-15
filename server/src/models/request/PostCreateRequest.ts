export class PostCreateRequest {
    public type!: string;
    public data!: string;
    public filename!: string;
    public userId!: number;

    constructor(param: any) {
        this.type = param.type;
        this.data = param.data;
        this.filename = param.filename;
        this.userId = param.userId;
    }

    public getAll() {
        return {
            type: this.type,
            data: this.data,
            filename: this.filename,
            userId: this.userId,
        };
    }

    public getJSONForQueue() {
        return {
            type: this.type,
            data: this.data,
            filename: this.filename,
            userId: this.userId,
        };
    }
}
