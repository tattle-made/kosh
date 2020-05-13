import { Express, Request, Response } from 'express';
import { MetadataController } from './MetadataController';
const metadataController = new MetadataController();

export function register(app: Express) {
    app.get('/api/metadata/post/:postId/template/:templateId/get', (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const templateId = Number(req.params.templateId);
        metadataController.get(postId, templateId).then((metadata) => res.send(metadata));
    });

    app.post('/api/metadata/post/:postId/template/:templateId/save', (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const templateId = Number(req.params.templateId);
        const data = req.body.data;
        const userId = req.body.userId;
        metadataController.saveByTemplate(postId, templateId, data, userId).then((resp: any) => res.send(resp));
    });

    app.post('/api/metadata/post/:postId/item/:itemId/update', (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const itemId = Number(req.params.itemId);
        const value = req.body.value;
        const userId = Number(req.body.userId);
        metadataController.update(postId, itemId, value, userId).then((resp) => res.send(resp));
    });

    app.get('/api/metadata-changes/post/:postId/get', (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        metadataController.getChangesByPost(postId).then((changes) => res.send(changes));
    });

    app.get('/api/metadata-changes/post/:postId/template/:templateId/get', (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const templateId = Number(req.params.templateId);
        metadataController.getChangesByPostTemplate(postId, templateId).then((changes) => res.send(changes));
    });

    app.get('/api/metadata-changes/post/:postId/template/:templateId/user/:userId/get', (req: Request, res: Response) => {
        const postId = Number(req.params.postId);
        const templateId = Number(req.params.templateId);
        const userId = Number(req.params.userId);
        metadataController.getChangesByPostTemplateAndUser(postId, templateId, userId).then((changes) => res.send(changes));
    });
}