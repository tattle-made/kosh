// import { MetadataController } from './controllers/MetadataController';
//const metadataController = new MetadataController();

app.get('/api/posts/id/:id/metadata', (req: Request, res: Response) => {
    const id = Number(req.params.id);
    metadataController.getByPostId(id).then((post) => res.send(post));
});
