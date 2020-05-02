process.env.REDIS_HOST = 'localhost';
import { Redis } from '../../service/redis';
import { AnnotationRedisRepository } from './AnnotationRedisRepository';
import {
    AnnotationType,
    AnnotationRedisDataModel,
} from './AnnotationRedisDataModel';

let annotationRedisRepository: AnnotationRedisRepository;
let redis: Redis;

describe.only('Write and Retrieve Values', () => {
    const payload: AnnotationType = {
        key: '1234:28',
        emotion: 'joy',
        factual_claim: true,
        verifiable: true,
        place: true,
        cta: true,
        citizen_journalism: false,
        fact_checked: true,
        users:
            '{"viewers":[{"id":1,"name":"denny"},{"id":2,"name":"kruttika"}],"editors":[{"id":3,"name":"tarunima"}]}',
    };

    beforeAll((done) => {
        redis = new Redis();
        redis.setup(done);
        annotationRedisRepository = new AnnotationRedisRepository(redis);
    });

    afterAll(() => {
        // annotationRedisRepository
        //     .get(payload.key)
        //     .then((data) => data.id)
        //     .then((id) => {
        //         return redis
        //             .getORM()
        //             .factory<AnnotationRedisDataModel>(
        //                 AnnotationRedisDataModel.modelName,
        //             )
        //             .then((annotation) => {
        //                 annotation.id = id;
        //                 return annotation.remove();
        //             });
        //     })
        //     .catch((err) => console.log('error cleaning up redis : ', err));
    });

    test('store and retrieve data from redis', () => {
        return annotationRedisRepository.store(payload).then((res: any) => {
            return annotationRedisRepository.get(payload.key).then((data) => {
                expect(data.key).toBe(payload.key);
            });
        });
    });
});

describe.skip('Update Value by key', () => {
    const payload: AnnotationType = {
        key: '1234:39',
        emotion: 'murder',
        factual_claim: true,
        verifiable: true,
        place: true,
        cta: true,
        citizen_journalism: false,
        fact_checked: true,
        users: '',
    };

    beforeAll((done) => {
        if (skip) {
            return;
        }
        redis = new Redis();
        redis.setup(done);
        annotationRedisRepository = new AnnotationRedisRepository(redis);
    });

    afterAll(() => {
        annotationRedisRepository
            .get(payload.key)
            .then((data) => data.id)
            .then((id) => {
                return redis
                    .getORM()
                    .factory<AnnotationRedisDataModel>(
                        AnnotationRedisDataModel.modelName,
                    )
                    .then((annotation) => {
                        annotation.id = id;
                        return annotation.remove();
                    });
            })
            .catch((err) => console.log('error cleaning up redis2 : ', err));
    });

    test('write a form. update value and then check', () => {
        return annotationRedisRepository.store(payload).then((res: any) => {
            return annotationRedisRepository
                .updateValue(payload.key, 'emotion', 'joy')
                .then(() => {
                    return annotationRedisRepository
                        .get(payload.key)
                        .then((data) => {
                            expect(data.emotion).toBe('joy');
                        });
                });
        });
    });

    // test.only('hi', () => {
    //     return annotationRedisRepository.test(payload.key, '', '').then(() => {
    //         expect(1).toBe(1);
    //         return Promise.resolve('done');
    //     });
    // });
});
