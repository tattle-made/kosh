import * as express from 'express';
import * as cors from 'cors';
import {Request, Response} from 'express';
import {PostController} from './controllers/PostController';
import {SearchController} from './controllers/SearchController';
import {LoginController} from './controllers/LoginController';

import {PostCreateRequest} from './models/request/PostCreateRequest';

import LoginResponse from './models/response/LoginResponse';

const app = express();
const port = 8080;

// app.use(cors);
app.use(express.json());

// import logger from './logger-core';
const postController = new PostController();
const searchController = new SearchController();
const loginController = new LoginController();

app.get('/', (req: Request, res: Response) => {
    res.send('pong');
});

app.get('/posts', (req: Request, res: Response) => {
    postController.getAll()
    .then((posts) => res.send(posts));
});

app.post('/posts', (req: Request, res: Response) => {
    const post = new PostCreateRequest(req.body);
    postController.create(post)
    .then((response: JSON) => res.send(response))
    .catch((err) => res.send(err.JSON));
});

app.get('/posts/:id', (req: Request, res: Response) => {
    const {id} = req.params;
    postController.get(id)
    .then((post) => res.send(post));
});

app.get('/search', (req: Request, res: Response) => {
    res.send(searchController.search(req.query));
});

app.post('/auth/login', (req: Request, res: Response) => {
    const {username, password} = req.body;
    loginController.login(username, password)
    .then((response) => res.send((new LoginResponse(response).get())));
});

app.post('/auth/logout', (req: Request, res: Response) => {
    loginController.logout()
    .then((response) => res.send({msg: response}));
});


app.listen(port, () => {
    console.log('server is listening to ', port);
});
