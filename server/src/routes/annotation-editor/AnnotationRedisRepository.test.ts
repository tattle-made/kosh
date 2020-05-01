process.env.REDIS_HOST = 'localhost';
import { Redis } from '../../service/redis';
import { AnnotationRedisRepository } from './AnnotationRedisRepository';
import {
    AnnotationType,
    AnnotationRedisDataModel,
} from './AnnotationRedisDataModel';

let annotationRedisRepository: AnnotationRedisRepository;
let redis: Redis;
const payload: AnnotationType = {
    key: '1234:24',
    emotion: 'joy',
    factual_claim: true,
    verifiable: true,
    place: true,
    cta: true,
    citizen_journalism: false,
    fact_checked: true,
};

beforeAll((done) => {
    redis = new Redis();
    redis.setup(done);
    annotationRedisRepository = new AnnotationRedisRepository(redis);
});

// afterAll(() => {
//     redis
//         .getORM()
//         .factory<AnnotationRedisDataModel>(
//             AnnotationRedisDataModel.modelName,
//             payload.key,
//         )
//         .then((model) => model.remove())
//         .catch((err) => console.log('error cleaning up redis : ', err));
// });

test.only('store and retreive data from redis', () => {
    return annotationRedisRepository.store(payload).then((res: any) => {
        return annotationRedisRepository.get(payload.key).then((data) => {
            console.log('data', data);
            console.log('payload', payload);
            expect(data.key).toBe(payload.key);
        });
    });
});
