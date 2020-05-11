import { AnnotationProperties } from './AnnotationProperties';
import { AnnotationRedisRepository } from './AnnotationRedisRepositoryInterface';
import { ShareChatSocialRealTimeRedisRepository } from './ShareChatSocialRealTimeRedisRepository';
import { NohmModel } from 'nohm';

export const annotationTemplateRecords: Record<
    string,
    AnnotationRedisRepository<AnnotationProperties, NohmModel>
> = {
    1: new ShareChatSocialRealTimeRedisRepository('Sharechat Social RealTime'),
};
