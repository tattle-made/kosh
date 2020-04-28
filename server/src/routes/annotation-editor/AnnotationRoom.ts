import { AnnotationUser } from './AnnotationUser';
import { Promise } from 'bluebird';

export class AnnotationRoom {
    constructor(rommId: string) {
        return;
    }

    public addViewer(userId: number) {
        return Promise.resolve({});
    }

    public removeViewer(userId: number) {
        return Promise.resolve({});
    }

    public addEditor(userId: number) {
        return Promise.resolve({});
    }

    public setMetadataKeyAsBeingEdited(metakey: string) {
        return Promise.resolve({});
    }

    public removeEditor(userId: number) {
        return Promise.resolve({});
    }

    public setNewValue(userId: number, metakey: string, metaValue: string) {
        return Promise.resolve({});
    }

    /**
     * This returns data from a redis store. this might be data that is still being
     * currently updated by users.
     *
     * @param {string} roomId
     * @returns
     * @memberof AnnotationController
     */
    public getMostRecentData() {
        return;
    }

    /**
     * This returns data from a sql database. Its more likely to be stable and not in
     * an incomplete state
     *
     * @param {string} roomId
     * @returns
     * @memberof AnnotationController
     */
    public getStableData() {
        return;
    }

    public toString(): string {
        return '';
    }
}
