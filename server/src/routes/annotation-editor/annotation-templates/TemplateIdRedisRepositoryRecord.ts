import { AnnotationProperties } from './AnnotationProperties';
import { AnnotationRedisRepositoryBaseClass } from './AnnotationRedisRepositoryBaseClass';
import { ShareChatSocialRealTimeRedisRepository } from './sharechat-social-rt/ShareChatSocialRealTimeRedisRepository';
import { TattleRealTimeRedisRepository } from './tattle/TattleRealTimeRedisRepository';
import { NohmModel } from 'nohm';

export const annotationTemplateRecords: Record<
    string,
    AnnotationRedisRepositoryBaseClass<AnnotationProperties, NohmModel>
> = {
    1: new ShareChatSocialRealTimeRedisRepository('Sharechat Social RealTime'),
    2: new TattleRealTimeRedisRepository('Tattle RealTime'),
};
