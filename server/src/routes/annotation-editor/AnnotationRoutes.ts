import { AnnotationController } from './AnnotationController';
import { AnnotationRoom } from './AnnotationRoom';
import { Express, Request, Response } from 'express';
import { Server, Socket } from 'socket.io';
/**
 * Public Routes for suppo
 *
 * @class AnnotationRoutes
 */
export class AnnotationRoutes {
    private controller = new AnnotationController();
    private io: Server;
    private app: Express;

    constructor(app: Express, io: Server) {
        this.app = app;
        this.io = io;
    }

    private setupHandlerForJoinChannel(socket: Socket) {
        socket.on('join_room', (data) => {
            console.log('join room ', data);
            this.controller.createRoom(data.roomId);
            socket.broadcast.emit('join_room', { join: true });
        });
        return;
    }

    private setupHandlerForStartEditMetadata(socket: Socket) {
        socket.on('start_edit_metadata', (data) => {
            socket.broadcast.emit('start_edit_metadata', data);
        });
    }

    private setupHandlerForStopEditMetadata(socket: Socket) {
        socket.on('stop_edit_metadata', (data) => {
            console.log('stop edit metadata', data);
            console.log('controller ', this.controller.getRoom(data.roomId));
            this.controller
                .getRoom(data.roomId)
                ?.update(data.key, data.value)
                .then((payload) => console.log('done editing ', payload));
            socket.broadcast.emit('stop_edit_metadata', data);
        });
    }

    private setupHandlerForLeaveChannel(socket: Socket) {
        return;
    }

    private setupHandlerForGetMetadata(socket: Socket) {
        socket.on('get_metadata', (data) => {
            console.log('request for metadata from room : ', data.roomId);
            const room = this.controller.getRoom(data.roomId);
            room?.getData(true).then((payload) => {
                socket.broadcast.emit('get_metadata', payload);
            });
        });
    }

    /**
     * Define all the public REST API endpoints and websocket channels here
     *
     * @returns
     * @memberof AnnotationRoutes
     */
    public registerPublicEndpoints() {
        console.log('regisering public endpoints');
        this.io
            .of('annotation')
            .on('connection', (socket) => {
                console.log('client connected to annotation room');
                const { room_name } = socket.handshake.query;
                socket.join(room_name);
                this.setupHandlerForStartEditMetadata(socket);
                this.setupHandlerForStopEditMetadata(socket);
                this.setupHandlerForJoinChannel(socket);
                this.setupHandlerForLeaveChannel(socket);
                this.setupHandlerForGetMetadata(socket);
            })
            .on('disconnect', (socket: any) => {
                console.log('client disconnected from annotation namespace');
            });
    }
}
