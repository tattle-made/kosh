import { Express, Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import { FactCheckedStoryController } from '../fact-checked-stories/FactCheckedStoryController';
import { GetFactCheckStoryRequestModel } from '../fact-checked-stories/GetFactCheckStoryRequestModel';
import { SearchServer } from '../../service/search-server';
const searchServer = new SearchServer();

export function register( app: Express ) {
    app.get('/public/ping', (req: Request, res: Response) => {
        res.send({ message : 'pong', version: process.env.APP_VERSION});
    });

    app.get('/public/fact-check-story/:type/:page', (req: Request, res: Response) => {
        console.log('get public fact-check-story');
        const factCheckedStoryController = new FactCheckedStoryController();

        const getFactCheckStoryRequestModelInstance = plainToClass(GetFactCheckStoryRequestModel, req.params);

        factCheckedStoryController.getAll(getFactCheckStoryRequestModelInstance)
        .then((response) => res.send(response))
        .catch((err) => res.send(err));
    });

    app.post('/public/search/duplicate-stories', (req: Request, res: Response) => {
        const url = req.body.url;
        searchServer.findDuplicateStories(url)
        .then((result) => res.json({status: 'data', urls: result}))
        .catch((err) => res.json({status: 'error', message : err.message}));
    });
}
