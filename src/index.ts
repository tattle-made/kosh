import * as express from 'express';
import {Request, Response} from 'express';
import {PostController} from './controllers/PostController';
import {SearchController} from './controllers/SearchController';
import {LoginController} from './controllers/LoginController';

import LoginResponse from './models/response/LoginResponse';

const app = express();
const port = 8080;

app.use(express.json());

// import logger from './logger-core';
const postController = new PostController();
const searchController = new SearchController();
const loginController = new LoginController();

app.get('/', (req: Request, res: Response) => {
    res.send('pong');
});

app.get('/posts', (req: Request, res: Response) => {
    res.send(postController.getAll());
});

app.get('/posts/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    res.send(postController.get(id));
});

app.get('/search', (req: Request, res: Response) => {
    res.send(searchController.search(req.query));
});

app.post('/auth/login', (req: Request, res: Response) => {
    const {username, password} = req.body;
    loginController.login(username, password)
    .then((response) => res.send((new LoginResponse(response).get())));
});


app.listen(port, () => {
    console.log('server is listening to ', port);
});
