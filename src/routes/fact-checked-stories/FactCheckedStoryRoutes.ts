import { Express, Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import { CreateStoryRequestModel } from './CreateStoryRequestModel';
import { FactCheckedStoryController } from './FactCheckedStoryController';

import { PostCreateRequest } from '../../models/request/PostCreateRequest';
import { PostController } from '../../controllers/PostController';
import { PostIndexJobCreateModel } from '../posts/PostIndexJobCreateModel';
import { FactCheckedStory } from './FactCheckedStoryDb';
import queueManagerInstance from '../../queue';


// Job Queues


/**
 * todo : send success response, send failure response
 * @param app
 */
export function register(app: Express) {
    app.post('/api/fact-check-story', (req: Request, res: Response) => {

        const postController = new PostController();
        const createStoryRequestModelInstance = plainToClass(CreateStoryRequestModel, req.body);
        const post = new PostCreateRequest(
            createStoryRequestModelInstance.getJSONForStoringInPostSequelize());

        postController
        .create(post)
        .then((response: any) => {
            res.send(response);
            return response.id;
        })
        .then((postId) => {
            createStoryRequestModelInstance.postId = postId;
            const factCheckedStoryController = new FactCheckedStoryController();

            return factCheckedStoryController.create(createStoryRequestModelInstance)
            .then(() => postId);
        })
        .then((postId) => postController.get(postId))
        .then((postJson) => {
            // tslint:disable-next-line:max-line-length
            queueManagerInstance.addFactCheckStoryIndexJob(createStoryRequestModelInstance);
        })
        .catch((err) => res.send(err.JSON));
    });
}
