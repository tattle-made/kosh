import BaseController from "./_BaseController";
import {
    Post,
    create,
    getAll,
    get,
    getByTime,
    getByTimeAndUsers,
    deletePost
} from "../models/data/PostDb";

import { PostCreateRequest } from "../models/request/PostCreateRequest";

export class PostController extends BaseController {
    constructor() {
        super("temp");
    }

    public getAll(page: number) {
        return getAll(page);
    }

    public get(id: number) {
        return get(id);
    }

    public getByTime(page: number, d1: string, d2: string) {
        return getByTime(page, d1, d2);
    }

    public getByTimeAndUsers(
        user_id: any,
        page: number,
        d1: string,
        d2: string
    ) {
        return getByTimeAndUsers(user_id, page, d1, d2);
    }

    public create(param: PostCreateRequest): Promise<JSON> {
        return create(param);
    }

    public delete(id: number) {
        return deletePost(id);
    }
}
