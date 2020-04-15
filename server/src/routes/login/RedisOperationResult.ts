export class RedisOperationResult {
    public type: 'error' | 'data';
    public message: string;
    public payload: any;

    constructor(type: 'error' | 'data', message: string, payload: any) {
        this.type = type;
        this.message = message;
        this.payload = payload;
    }

    public static dataFactory(message: string, payload: any): RedisOperationResult {
        return new RedisOperationResult('data', message, payload);
    }

    public static errorFactory(message: string, payload: any): RedisOperationResult {
        return new RedisOperationResult('error', message, payload);
    }
}
