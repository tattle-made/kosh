
export default abstract class BaseServerResponse {

    public getResponse(message: object): object {
        return {
            apiVersion: process.env.APP_VERSION,
            ...message,
        };
    }

    public abstract get(): object;
}
