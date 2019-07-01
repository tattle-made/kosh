import * as express from 'express';
import {PostController} from './controllers/PostController';
import {SearchController} from './controllers/SearchController';
express.json();
const app = express();
const port = 8080;

// import logger from './logger-core';
const postController = new PostController();
const searchController = new SearchController();

app.get('/', (req: any, res: any) => {
    res.send('pong');
});

app.get('/posts', (req: any, res: any) => {
    res.send(postController.getAll());
});

app.get('/posts/:id', (req: any, res: any) => {
    const {id} = req.params;
    res.send(postController.get(id));
});

app.get('/search', (req: any, res: any) => {
    res.send(searchController.search(req.query));
});


app.listen(port, () => {
    console.log('server is listening to ', port);
});
