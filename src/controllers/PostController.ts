import BaseController from "./_BaseController";
import {
    Post,
    create,
    getAll,
    get,
    getByTime,
    deletePost
} from "../models/data/PostDb";

import { PostCreateRequest } from "../models/request/PostCreateRequest";

export class PostController extends BaseController {
    constructor() {
        super("temp");
    }

    public getAll() {
        return getAll();
    }

    public get(id: number) {
        return get(id);
    }

    public getByTime(d1: string, d2: string) {
        return getByTime(d1, d2);
    }

    public create(param: PostCreateRequest): Promise<JSON> {
        return create(param);
    }

    public delete(id: number) {
        return deletePost(id);
    }
}
