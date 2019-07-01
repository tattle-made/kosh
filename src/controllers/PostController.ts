import BaseController from './_BaseController';
import Post from '../models/data/Post';

export class PostController extends BaseController {
    constructor() {
        super('temp');
    }

    public getAll(): Post[] {
        return [
            new Post('asdf-asdf-asdf', 'title one', ['one', 'two', 'three']),
            new Post('asdf-asdf-asdg', 'title two', ['one', 'two', 'three']),
            new Post('asdf-asdf-asdh', 'title three', ['one', 'two', 'three']),
            new Post('asdf-asdf-asdi', 'title four', ['one', 'two', 'three']),
        ];
    }

    public get(id: string): Post {
        return new Post('asdf-asdf-asdf', 'title one', ['one', 'two', 'three']);
    }
}
