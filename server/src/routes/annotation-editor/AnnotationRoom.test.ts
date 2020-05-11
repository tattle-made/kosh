process.env.REDIS_HOST = 'localhost';
import { Redis } from '../../service/redis';
import { AnnotationRoom } from './AnnotationRoom';
import { AnnotationRedisRepository } from './AnnotationRedisRepository';
import {
    AnnotationType,
    AnnotationRedisDataModel,
} from './AnnotationRedisDataModel';
import { ShareChatSocialRealTimeRedisRepository } from './annotation-templates/ShareChatSocialRealTimeRedisRepository';

// describe('Test Annotation Room', () => {
//     let annotationRoom: AnnotationRoom;
//     const payload: AnnotationType = {
//         key: '1234:28',
//         emotion: 'joy',
//         factual_claim: true,
//         verifiable: true,
//         place: true,
//         cta: true,
//         citizen_journalism: false,
//         fact_checked: true,
//         users:
//             '{"viewers":[{"id":1,"name":"denny"},{"id":2,"name":"kruttika"}],"editors":[{"id":3,"name":"tarunima"}]}',
//     };

//     beforeAll((done) => {
//         redis = new Redis();
//         redis.setup(done);
//         annotationRedisRepository = new AnnotationRedisRepository(redis);
//         annotationRoom = new AnnotationRoom('abc');
//     });

//     afterAll(() => {
//         annotationRedisRepository
//             .get(payload.key)
//             .then((data) => data.id)
//             .then((id) => {
//                 return redis
//                     .getORM()
//                     .factory<AnnotationRedisDataModel>(
//                         AnnotationRedisDataModel.modelName,
//                     )
//                     .then((annotation) => {
//                         annotation.id = id;
//                         return annotation.remove();
//                     });
//             })
//             .catch((err) => console.log('error cleaning up redis : ', err));
//     });

//     test('hi', () => {
//         expect(annotationRoom).toBe(1);
//     });
// });

describe('Non Redis Operations for Annotation Room', () => {
    test('Template Id and Post Id are extracted correctly', () => {
        const room = new AnnotationRoom('123:1');
        expect(room.postId).toBe(123);
        expect(room.templateId).toBe(1);
    });

    test('Post Id is not a number if not set correctly', () => {
        const room = new AnnotationRoom('123:abc');
        expect(room.postId).toBe(123);
        expect(room.templateId).toBe(NaN);
    });

    test('Annotation room is initialized with the correct Annotation Template Repository', () => {
        const room = new AnnotationRoom('123456:1');
        expect(
            room.annotationTemplate instanceof
                ShareChatSocialRealTimeTemplateRepository,
        ).toBe(true);
    });
});
