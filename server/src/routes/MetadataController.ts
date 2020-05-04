import BaseController from './_BaseController';
import { getMetadataByPost } from '../models/data/MetadataIndex';

import { PostCreateRequest } from '../models/request/PostCreateRequest';

export class MetadataController extends BaseController {
    constructor() {
        super('temp');
    }
    public getByPostId(post_id: number) {
        return getMetadataByPost(post_id);
    }
}
