import { AnnotationRoom } from './AnnotationRoom';
import { Promise } from 'bluebird';

export class AnnotationController {
    private rooms: Map<string, AnnotationRoom> = new Map();

    public createRoom(id: string) {
        if (this.rooms.get(id) === undefined) {
            this.rooms.set(id, new AnnotationRoom(id));
        }
    }

    public getRoom(id: string): AnnotationRoom | undefined {
        try {
            return this.rooms.get(id);
        } catch {
            throw new Error('Room does not exist');
        }
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
        return annotationRoom.removeEditor(userId);
        // .then(() =>
        //     annotationRoom.setNewValue(userId, metaKey, finalMetaValue),
        // );
    }

    public toJSON() {
        const rooms: object[] = [];

        this.rooms.forEach((room, key) => {
            rooms.push(room.toJSON());
        });
        return { rooms };
    }
}
