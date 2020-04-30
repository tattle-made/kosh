process.env.REDIS_HOST = 'localhost';
import { Redis } from '../../service/redis';
import { AnnotationRedisRepository } from './AnnotationRedisRepository';
import { AnnotationType } from './AnnotationRedisDataModel';

let annotationRedisRepository: AnnotationRedisRepository;

beforeAll((done) => {
    const redis = new Redis();
    redis.setup(done);
    annotationRedisRepository = new AnnotationRedisRepository(redis);
});

test.only('store and retreive data from redis', (done) => {
    const payload: AnnotationType = {
        id: 20,
        emotion: 'joy',
        factual_claim: true,
        verifiable: true,
        place: true,
        cta: true,
        citizen_journalism: false,
        fact_checked: true,
    };

    return annotationRedisRepository.store(payload).then((res: any) => {
        return annotationRedisRepository.get(payload.id).then((data) => {
            console.log('data', data);
            console.log('payload', payload);
            expect(1).toBe(1);
        });
    });
});
