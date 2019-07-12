import BaseController from "./_BaseController";
import { Post, create, getAll, get, getByTime } from "../models/data/PostDb";

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

  // this returns a promise of type JSON.
  // why promise ? only json is returned ?
  public create(param: PostCreateRequest): Promise<JSON> {
    return create(param);
  }
}
