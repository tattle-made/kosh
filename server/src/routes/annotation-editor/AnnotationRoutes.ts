import { AnnotationController } from './AnnotationController';
import { AnnotationRoom } from './AnnotationRoom';
/**
 * Public Routes for suppo
 *
 * @class AnnotationRoutes
 */
class AnnotationRoutes {
    private controller = new AnnotationController();

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

    private setupHandlerForStartEditMetadata() {
        return;
    }

    private setupHandlerForStopEditMetadata() {
        return;
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
        return;
    }
}
