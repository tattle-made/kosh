import BaseController from './_BaseController';
import {Post, create, getAll, get} from '../models/data/PostDb';

export class PostController extends BaseController {
    constructor() {
        super('temp');
    }

    public getAll() {
        return getAll();
    }

    public get(id: number) {
        return get(id);
    }

    public create(type: string, data: string, filename: string, source: number): Promise<JSON> {
        return create(type, data, filename, source);
    }
}
