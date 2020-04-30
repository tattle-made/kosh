import { Redis } from '../../service/redis';
import {
    AnnotationRedisDataModel,
    AnnotationType,
} from './AnnotationRedisDataModel';

export class AnnotationRedisRepository {
    private redis: Redis;

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

    public get(id: number) {
        return this.redis
            .getORM()
            .factory<AnnotationRedisDataModel>(
                AnnotationRedisDataModel.modelName,
            )
            .then((annotationRedisDataModel) => {
                return annotationRedisDataModel
                    .find({ id })
                    .then((annotationData) =>
                        annotationRedisDataModel.load(annotationData),
                    );
            });
    }

    public updateValue(key: string, value: string) {
        return;
    }
}
