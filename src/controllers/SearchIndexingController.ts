import BaseController from './_BaseController';
import { PostController } from './PostController';

const postController = new PostController();

export class SearchIndexingController extends BaseController {
    constructor() {
        super('search-indexing');
    }

    public indexPending() {
        console.log('indexing 1');
        postController.getIndexPendingPosts()
        .then((result) => {
            console.log(result);
        });
    }
}

