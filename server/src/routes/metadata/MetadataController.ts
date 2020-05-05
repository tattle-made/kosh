import BaseController from '../../controllers/_BaseController';
import { getMetadataByPost } from '../../models/data/MetadataIndex';

export class MetadataController extends BaseController {
    constructor() {
        super('temp');
    }
    public getByPostId(postId: number) {
        return getMetadataByPost(postId);
    }
}
