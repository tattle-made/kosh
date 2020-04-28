import { AnnotationRoom } from './AnnotationRoom';
import { Promise } from 'bluebird';

export class AnnotationController {
    private createRoom(id: string) {
        return;
    }

    public getRoom(id: string): Promise<AnnotationRoom> {
        return Promise.resolve(new AnnotationRoom(id));
    }

    /**
     * adds a user to the AnnotationEditingRoom
     * this function will only get the userId as its input so it needs to fetch the
     * userId from the sql db
     *
     * @param {string} roomId
     * @param {string} userId
     * @memberof AnnotationController
     */
    public addUserAsViewer(roomId: string, userId: number) {
        return new AnnotationRoom(roomId).addViewer(userId);
    }

    public removeUserAsViewer(roomId: string, userId: number) {
        return;
    }

    public addUserAsEditor(
        roomId: string,
        userId: number,
        metaKey: string,
        currMetaValue: string,
    ) {
        const room = new AnnotationRoom(roomId);
        return room
            .addEditor(userId)
            .then(() => room.setMetadataKeyAsBeingEdited(metaKey));
    }

    public removeUserAsEditor(
        roomId: string,
        userId: number,
        metaKey: string,
        finalMetaValue: string,
    ) {
        const annotationRoom = new AnnotationRoom(roomId);
        return annotationRoom
            .removeEditor(userId)
            .then(() =>
                annotationRoom.setNewValue(userId, metaKey, finalMetaValue),
            );
    }

    /**
     * This function is meant to assist in debugging. It will return ids of all active annotation rooms.
     * Since that number could potentially be very high, we serve the results in a paginated manner
     * instead of returning them all at once.
     *
     * @param {number} pageNum
     * @param {number} pageSize
     * @returns
     * @memberof AnnotationController
     */
    public getRooms(pageNum: number, pageSize: number) {
        return;
    }
}
