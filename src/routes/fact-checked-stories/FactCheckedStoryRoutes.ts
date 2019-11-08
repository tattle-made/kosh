import { Express, Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import { CreateStoryRequestModel } from './CreateStoryRequestModel';
import { FactCheckedStoryController } from './FactCheckedStoryController';
import queueManagerInstance from '../../queue';

// Job Queues


/**
 * todo : send success response, send failure response
 * @param app
 */
export function register(app: Express) {
    app.post('/api/fact-check-story', (req: Request, res: Response) => {
        const createStoryRequestModelInstance = plainToClass(CreateStoryRequestModel, req.body);
        const factCheckedStoryController = new FactCheckedStoryController();

        if (!createStoryRequestModelInstance.isValid()) {
            res.status(400).end();
        } else {
            queueManagerInstance.addFactCheckStoryIndexJob(createStoryRequestModelInstance)
            .then((result) => res.json({message: 'job added'}))
            .catch((err) => console.log(err));
        }

    });
}
