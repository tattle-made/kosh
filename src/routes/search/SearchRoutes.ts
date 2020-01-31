import { Express, Request, Response } from 'express';
import {plainToClass} from 'class-transformer';
import { SearchServer } from '../../service/search-server';

const searchServer = new SearchServer();
/**
 * todo : send success response, send failure response
 * @param app
 */
export function register(app: Express) {
    app.post('/api/search/duplicate', (req: Request, res: Response) => {
        const url = req.body.url;
        const threshold = req.body.threshold;
        searchServer.findDuplicate(url)
        .then((result) => res.json({status: 'data', ...result}))
        .catch((err) => res.json({status: 'error', message : err.message}));
    });

    app.post('/api/search/duplicate-stories', (req: Request, res: Response) => {
        const url = req.body.url;
        searchServer.findDuplicateStories(url)
        .then((result) => res.json({status: 'data', urls: result}))
        .catch((err) => res.json({status: 'error', message : err.message}));
    });

    app.post('/api/search/find-text-in-image', (req: Request, res: Response) => {
        const text = req.body.text;
        searchServer.findTextWithinImage(text)
        .then((result) => res.json({status: 'data', urls: result}))
        .catch((err) => res.json({status: 'error', message : err.message}));
    });

    app.post('/api/search/find-tag', (req: Request, res: Response) => {
        const text = req.body.tag;
        searchServer.searchTag(text)
        .then((result) => res.json({status: 'data', posts: result}))
        .catch((err) => res.json({status: 'error', message : err.message}));
    });
}
