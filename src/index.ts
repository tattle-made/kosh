import * as express from "express";
import * as cors from "cors";
import * as Sentry from "@sentry/node";
import { Request, Response } from "express";
import { PostController } from "./controllers/PostController";
import { SearchController } from "./controllers/SearchController";
import { LoginController } from "./controllers/LoginController";

import { PostCreateRequest } from "./models/request/PostCreateRequest";

import LoginResponse from "./models/response/LoginResponse";
import { UserController } from "./controllers/UserController";
import { UserCreateRequest } from "./models/request/UserCreateRequest";

const app = express();
const port = 8080;
Sentry.init({
  dsn: "https://015d3991941a475d9985ca5360098a1c@sentry.io/1499856"
});

// app.use(cors);
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());

// import logger from './logger-core';
const postController = new PostController();
const searchController = new SearchController();
const loginController = new LoginController();
const userController = new UserController();

app.get("/", (req: Request, res: Response) => {
  res.send("pong");
});

app.get("/posts", (req: Request, res: Response) => {
  postController.getAll().then(posts => res.send(posts));
});

app.post("/postByTime", (req: Request, res: Response) => {
  const { d1, d2 } = req.body;
  postController
    .getByTime(d1, d2)
    .then(posts => res.send(posts))
    .catch(err => res.send(err.JSON));
});

app.post("/posts", (req: Request, res: Response) => {
  const post = new PostCreateRequest(req.body);
  postController
    .create(post)
    .then((response: JSON) => res.send(response))
    .catch(err => res.send(err.JSON));
});

app.get("/posts/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  postController.get(id).then(post => res.send(post));
});

app.get("/search", (req: Request, res: Response) => {
  res.send(searchController.search(req.query));
});

app.post("/auth/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  loginController
    .login(username, password)
    .then(response => res.send(new LoginResponse(response).get()));
});

app.post("/auth/logout", (req: Request, res: Response) => {
  const { token } = req.body;
  loginController.logout(token).then(response => res.send(response));
});

app.post("/users/create", (req: Request, res: Response) => {
  const user = new UserCreateRequest(req.body);
  userController
    .createUser(user)
    .then(response => res.send(response))
    .catch(err => res.send(err.JSON));
});

app.post("/users/update/:id", (req: Request, res: Response) => {
  const user = new UserCreateRequest(req.body);
  const { id } = req.params;
  userController
    .updateUser(id, user)
    .then(response => res.send(response))
    .catch(err => res.send(err.JSON));
});

app.post("/users/delete/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  userController
    .deleteUser(id)
    .then(response => res.send(response))
    .catch(err => res.send(err.JSON));
});

app.use(Sentry.Handlers.errorHandler());

// app.use(function onError(err, req, res, next) {
//     // The error id is attached to `res.sentry` to be returned
//     // and optionally displayed to the user for support.
//     res.statusCode = 500;
//     res.end(res.sentry + '\n');
//   });

app.listen(port, () => {
  console.log("server is listening to ", port);
});
