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

    /**
     * returns the metadata associated with a post and templateId in JSON format.
     * if realTime is true, it will get data from Redis that might still be actively edited
     * if its not true, it will get data from the SQL database that might be old
     *
     * @private
     * @param {number} postId
     * @param {number} tempateId
     * @param {boolean} realTime
     * @returns
     * @memberof AnnotationRoutes
     */
    private getMetadata(postId: number, tempateId: number, realTime: boolean) {
        let room: AnnotationRoom;
        return this.controller.getRoom('').then((response) => {
            room = response;
            return realTime ? room.getMostRecentData() : room.getStableData();
        });
    }

    private setupHandlerForJoinChannel() {
        return;
    }

    private setupHandlerForStartEditMetadata(socket: Socket) {
        socket.on('start_edit_metadata', () => {
            console.log('edit metadata');
        });
    }

    private setupHandlerForStopEditMetadata(socket: Socket) {
        socket.on('stop_edit_metadata', () => {
            console.log('edit metadata');
        });
    }

    private setupHandlerForLeaveChannel() {
        return;
    }

    private setupHandlerForGetMetadata() {
        return;
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
                console.log('client connected to annotation namespace');
                const { room_name } = socket.handshake.query;
                socket.join('room_name');
                this.setupHandlerForStartEditMetadata(socket);
                this.setupHandlerForStopEditMetadata(socket);
            })
            .on('disconnect', (socket: any) => {
                console.log('client disconnected from annotation namespace');
            });
    }
}
