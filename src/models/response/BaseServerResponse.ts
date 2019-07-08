import * as config from 'config';

export default abstract class BaseServerResponse {
    public greeting = config.get('greeting');
    public apiVersion = config.get('version');

    public getResponse(message: object): object {
        return {
            greeting: this.greeting,
            apiVersion: this.apiVersion,
            ...message,
        };
    }

    public abstract get(): object;
}
