export class PostCreateRequest {
    public type: string;
    public data: string;
    public filename: string;
    public campaignId: number;
    public user_id: number;

    constructor(param: any) {
        this.type = param.type;
        this.data = param.data;
        this.filename = param.filename;
        this.campaignId = param.campaignId;
        this.user_id = param.user_id;
    }

    public getAll() {
        return {
            type: this.type,
            data: this.data,
            filename: this.filename,
            campaign_id: this.campaignId,
            user_id: this.user_id
        };
    }
}
