import { Express, Request, Response } from 'express';
import { MetadataController } from './MetadataController';
const metadataController = new MetadataController();

export function register(app: Express) {
    app.get('/api/posts/id/:id/metadata', (req: Request, res: Response) => {
        const id = Number(req.params.id);
        metadataController.getByPostId(id).then((post) => res.send(post));
    });
}
