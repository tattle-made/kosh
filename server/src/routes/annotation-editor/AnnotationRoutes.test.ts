import { Request, Response, Express } from 'express';
import * as http from 'http';
import * as express from 'express';
import * as socketio from 'socket.io';
import * as cors from 'cors';
import axios from 'axios';
import { AnnotationRoutes } from './AnnotationRoutes';
import * as socketioClient from 'socket.io-client';

let server: http.Server;
let io: socketio.Server;
const serverAddrress = 'http://localhost';
const serverPort = '3000';
const serverUrl = `${serverAddrress}:${serverPort}`;

function getConnectedClient(
    url: string = serverUrl,
    namespace: string,
    roomName: string,
) {
    return socketioClient.connect(
        `${serverUrl}/annotation?room_name=${roomName}`,
        {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
        },
    );
}

/*
 * setup a barebones express server
 *
 */
beforeAll((done) => {
    const app = express();
    const httpServer = http.createServer(app);

    server = httpServer.listen(serverPort, () => {
        done();
        console.log(`listening on *:${serverPort}`);
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

    io = socketio(server);
    app.set('socketio', io);
    io.on('connection', (client) => {
        // console.log('Client is connected');
    });

    const annotationRoutes = new AnnotationRoutes(app, io);
    annotationRoutes.registerPublicEndpoints();
});

afterAll(() => {
    server.close();
});

afterEach(() => {
    Object.values(io.of('/annotation').connected).map((socket) =>
        socket.disconnect(),
    );
});

test('10 Clients can connect to a room within /annotation namespace', (done) => {
    let connectedCount = 0;
    const sockets: SocketIOClient.Socket[] = [];
    for (let i = 0; i < 10; i++) {
        sockets.push(
            socketioClient.connect(
                'http://localhost:3000/annotation?room_name=1234:1',
                {
                    reconnectionDelay: 0,
                    forceNew: true,
                    transports: ['websocket'],
                },
            ),
        );
        sockets[i].on('connect', () => {
            connectedCount++;
            if (connectedCount === 10) {
                // tslint:disable-next-line:no-string-literal
                expect(io.nsps['/annotation'].adapter.rooms['abc'].length).toBe(
                    10,
                );
                done();
            }
        });
    }
});

test('start_edit_message is recieved by all connected clients', (done) => {
    const clientB = getConnectedClient(serverUrl, 'annotation', 'abc');
    const clientA = getConnectedClient(serverUrl, 'annotation', 'abc');

    const payload = {
        metaKey: 'location',
        metaValue: 'Punjab',
    };

    clientB.on('connect', () => {
        // console.log('B connected');
    });

    clientA.on('connect', () => {
        clientA.emit('start_edit_metadata', payload);
        clientB.on('start_edit_metadata', (data: any) => {
            try {
                expect(data).toEqual(payload);
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});

test('stop_edit_metadata is recieved by all connected clients', (done) => {
    const clientB = getConnectedClient(serverUrl, 'annotation', 'abc');
    const clientA = getConnectedClient(serverUrl, 'annotation', 'abc');

    const payload = {
        metaKey: 'location',
        metaValue: 'Haryana',
    };

    clientB.on('connect', () => {
        // console.log('B connected');
    });

    clientA.on('connect', () => {
        // console.log('A connected');
        clientA.emit('stop_edit_metadata', payload);
        clientB.on('stop_edit_metadata', (data: any) => {
            try {
                expect(data).toEqual(payload);
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});
