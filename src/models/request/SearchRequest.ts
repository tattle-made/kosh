export class SearchRequest {
    public type: string;
    public query: string;
    public url: string;

    constructor(param: any) {
        const { type, query, url } = param;
        this.type = type;
        this.query = query;
        this.url = url;
    }
}
