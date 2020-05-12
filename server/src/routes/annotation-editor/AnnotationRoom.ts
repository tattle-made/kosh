import { Promise } from 'bluebird';
import { AnnotationProperties } from './annotation-templates/AnnotationProperties';
import { AnnotationRedisRepositoryBaseClass } from './annotation-templates/AnnotationRedisRepositoryBaseClass';
import { NohmModel } from 'nohm';
import { annotationTemplateRecords } from './annotation-templates/TemplateIdRedisRepositoryRecord';

export class AnnotationRoom {
    public readonly postId: number;
    public readonly templateId: number;
    public readonly redisRepository: AnnotationRedisRepositoryBaseClass<
        AnnotationProperties,
        NohmModel
    >;

    constructor(public id: string) {
        this.postId = +id.split(':')[0];
        this.templateId = +id.split(':')[1];
        this.redisRepository = annotationTemplateRecords[this.templateId];
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

    public store(data: AnnotationProperties) {
        return this.redisRepository.store(data);
    }

    /**
     * This returns data from a redis store. this might be data that is still being
     * currently updated by users.
     *
     * @param {string} roomId
     * @returns
     * @memberof AnnotationController
     */
    public getMostRecentData(): Promise<AnnotationProperties> {
        return this.redisRepository.getData(this.id);
    }

    /**
     * This returns data from a sql database. Its more likely to be stable and not in
     * an incomplete state
     *
     * @param {string} roomId
     * @returns
     * @memberof AnnotationController
     */
    public getStableData(): Promise<AnnotationProperties> {
        return Promise.resolve({
            key: '',
            emotion: '',
            factual_claim: true,
            verifiable: true,
            place: true,
            citizen_journalism: true,
            cta: true,
            fact_checked: true,
            users: '',
        });
    }

    public getData(realtime: boolean): Promise<AnnotationProperties> {
        // get from the right repository. as simple as that? or get from
        return realtime ? this.getMostRecentData() : this.getStableData();
    }

    public reset() {
        return this.redisRepository.reset(this.id);
    }

    public toJSON(): object {
        return { room_id: this.id };
    }
}
