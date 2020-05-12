import { Redis } from '../../../service/redis';
import { AnnotationProperties } from './AnnotationProperties';
import { NohmModel } from 'nohm';
import { AnnotationRedisRepositoryInterface } from './AnnotationRedisRepositoryInterface';

export class AnnotationRedisRepositoryBaseClass<
    T extends AnnotationProperties,
    U extends NohmModel
> implements AnnotationRedisRepositoryInterface<T, U> {
    public data!: T;

    constructor(public name: string, private redis: Redis) {}

    private getRedisFactory() {
        return this.redis.getORM().factory<U>('annotation-room-shar-soc');
    }

    public store(data: T) {
        return this.getRedisFactory().then((annotationRedisDataModel) => {
            annotationRedisDataModel.property({
                ...data,
            });
            return annotationRedisDataModel.save();
        });
    }

    public getData(key: string): Promise<T & { id: string }> {
        return this.getRedisFactory().then((annotationRedisDataModel) => {
            return annotationRedisDataModel
                .find({ key })
                .then((annotationData) => {
                    return annotationRedisDataModel.load(annotationData);
                });
        });
    }

    public updateValue(key: string, keyName: string, value: any) {
        const temp = {
            [keyName]: value,
        };

        return this.getRedisFactory().then((annotationRedisDataModel) => {
            return annotationRedisDataModel
                .find({ key })
                .then((annotationData) => {
                    return annotationRedisDataModel
                        .load(annotationData)
                        .then((data) => {
                            annotationRedisDataModel.property({
                                ...temp,
                            });
                            return annotationRedisDataModel.save();
                        });
                });
        });
    }

    public reset(key: string) {
        return this.getData(key)
            .then((data) => data.id)
            .then((id) => {
                return this.getRedisFactory().then((annotation) => {
                    annotation.id = id;
                    return annotation.remove();
                });
            })
            .catch((err) => console.log('error cleaning up redis : ', err));
    }

    // remove(key: string) {
    //     annotationRedisRepository
    //         .get(key)
    //         .then((data) => data.id)
    //         .then((id) => {
    //             return redis
    //                 .getORM()
    //                 .factory<AnnotationRedisDataModel>(
    //                     AnnotationRedisDataModel.modelName,
    //                 )

    // }
}
