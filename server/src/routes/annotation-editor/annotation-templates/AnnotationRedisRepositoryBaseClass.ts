import { Redis } from '../../../service/redis';
import { AnnotationProperties } from './AnnotationProperties';
import { NohmModel } from 'nohm';
import { AnnotationRedisRepositoryInterface } from './AnnotationRedisRepositoryInterface';

export class AnnotationRedisRepositoryBaseClass<T, U extends NohmModel>
    implements AnnotationRedisRepositoryInterface<T, U> {
    private redis!: Redis;
    public data!: T;
    //    private annotationRedisModelStatic = Nohm.register(
    //        ShareChatAnnotationRedisDataModel,
    //    );

    constructor(public name: string) {}

    public store(data2: T) {
        return this.redis
            .getORM()
            .factory<U>(
                //    ShareChatAnnotationRedisDataModel.modelName,
                'annotation-room',
            )
            .then((annotationRedisDataModel) => {
                annotationRedisDataModel.property({
                    ...data2,
                });
                return annotationRedisDataModel.save();
            });
    }

    public getData(key: string): Promise<T> {
        return this.redis
            .getORM()
            .factory<U>(
                //    ShareChatAnnotationRedisDataModel.modelName,
                'annotation-room',
            )
            .then((annotationRedisDataModel) => {
                return annotationRedisDataModel
                    .find({ key })
                    .then((annotationData) =>
                        annotationRedisDataModel.load(annotationData),
                    );
            });
    }

    public updateValue(key: string, keyName: string, value: string) {
        const temp: Partial<T> = {
            [keyName]: value,
        };

        return this.redis
            .getORM()
            .factory<U>(
                //    ShareChatAnnotationRedisDataModel.modelName,
                'annotation-room',
            )
            .then((annotationRedisDataModel) => {
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
}
