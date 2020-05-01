import { Redis } from '../../service/redis';
import {
    AnnotationRedisDataModel,
    AnnotationType,
    AnnotationPropertiesOptional,
} from './AnnotationRedisDataModel';
import { Nohm } from 'nohm';

export class AnnotationRedisRepository {
    private redis: Redis;
    private annotationRedisModelStatic = Nohm.register(
        AnnotationRedisDataModel,
    );

    constructor(redis: Redis) {
        this.redis = redis;
        return;
    }

    public store(data: AnnotationType) {
        return this.redis
            .getORM()
            .factory<AnnotationRedisDataModel>(
                AnnotationRedisDataModel.modelName,
            )
            .then((annotationRedisDataModel) => {
                annotationRedisDataModel.property({
                    ...data,
                });
                return annotationRedisDataModel.save();
            });
    }

    public loadTyped(id: string): Promise<AnnotationRedisDataModel> {
        return this.annotationRedisModelStatic.load<AnnotationRedisDataModel>(
            id,
        );
    }

    public get(key: string) {
        return this.redis
            .getORM()
            .factory<AnnotationRedisDataModel>(
                AnnotationRedisDataModel.modelName,
            )
            .then((annotationRedisDataModel) => {
                return annotationRedisDataModel
                    .find({ key })
                    .then((annotationData) =>
                        annotationRedisDataModel.load(annotationData),
                    );
            });
    }

    public updateValue(key: string, keyName: string, value: any) {
        const temp: AnnotationPropertiesOptional = {
            [keyName]: value,
        };

        return this.redis
            .getORM()
            .factory<AnnotationRedisDataModel>(
                AnnotationRedisDataModel.modelName,
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

    public delete(key: string) {
        return this.redis.getORM;
    }
}
