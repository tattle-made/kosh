import BaseController from './_BaseController';
import {Post, create, getAll, get} from '../models/data/PostDb';

import {PostCreateRequest} from '../models/request/PostCreateRequest';

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

    public create(param: PostCreateRequest): Promise<JSON> {
        return create(param);
    }
}
