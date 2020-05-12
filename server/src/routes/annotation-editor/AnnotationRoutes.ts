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
            this.controller.createRoom(data.roomId);
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
            socket.broadcast.emit('stop_edit_metadata', data);
        });
    }

    private setupHandlerForLeaveChannel(socket: Socket) {
        return;
    }

    private setupHandlerForGetMetadata(socket: Socket) {
        socket.on('get_metadata', (data) => {
            const room = this.controller.getRoom(data.roomId);
            socket.broadcast.emit('get_metadata_result', room?.getData(true));
        });
    }

    /**
     * Define all the public REST API endpoints and websocket channels here
     *
     * @returns
     * @memberof AnnotationRoutes
     */
    public registerPublicEndpoints() {
        this.io
            .of('annotation')
            .on('connection', (socket) => {
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
