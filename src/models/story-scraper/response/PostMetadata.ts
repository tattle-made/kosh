import BaseServerResponse from '../../response/BaseServerResponse';
import { StoryMetadata } from '../StoryMetadata.d';


export class PostMetadata extends BaseServerResponse {

    constructor(stories: object) {
        super();
    }

    public get(): object {
        return this.getResponse({
            test : 'hi',
        });
    }
}
