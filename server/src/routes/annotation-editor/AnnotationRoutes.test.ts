import { Request, Response, Express } from 'express';
import * as http from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';
import * as cors from 'cors';
import axios from 'axios';
import { AnnotationRoutes } from './AnnotationRoutes';
import * as socketioClient from 'socket.io-client';

let server: http.Server;

/*
 * setup a barebones express server
 *
 */
beforeAll((done) => {
    const app = express();
    const httpServer = http.createServer(app);

    server = httpServer.listen(3000, () => {
        done();
        console.log('listening on *:3000');
    });

    app.get('/ping', (req: Request, res: Response) => {
        res.send('pong');
    });

    app.use(
        cors({
            origin: '*',
        }),
    );

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        );
        next();
    });

    const io = socketio(server);
    app.set('socketio', io);
    io.on('connection', (client) => {
        console.log('Client is connected');
    });

    const annotationRoutes = new AnnotationRoutes(app, io);
    annotationRoutes.registerPublicEndpoints();
});

afterAll(() => {
    server.close();
});

test('Setup Namespace', (done) => {
    const socket = socketioClient.connect('http://localhost:3000/annotation', {
        // tslint:disable-next-line:object-literal-key-quotes
        reconnectionDelay: 0,
        forceNew: true,
        // tslint:disable-next-line:object-literal-key-quotes
        transports: ['websocket'],
    });
    socket.on('connect', () => {
        console.log('connected');
        done();
    });
}, 10000);

// test('API call')

// test('API call', () => {
//     return axios
//         .get('https://jsonplaceholder.typicode.com/todos/1')
//         .then((res: any) => {
//             expect(res.data.userId).toBe(1);
//         });
// });
