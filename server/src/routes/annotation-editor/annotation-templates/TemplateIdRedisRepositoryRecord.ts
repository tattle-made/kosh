import 'reflect-metadata';
import { container } from 'tsyringe';
import { AnnotationProperties } from './AnnotationProperties';
import { AnnotationRedisRepositoryBaseClass } from './AnnotationRedisRepositoryBaseClass';
import { ShareChatSocialRealTimeRedisRepository } from './sharechat-social-rt/ShareChatSocialRealTimeRedisRepository';
import { TattleRealTimeRedisRepository } from './tattle/TattleRealTimeRedisRepository';
import { NohmModel } from 'nohm';
import { Redis } from '../../../service/redis';

const redis = container.resolve(Redis);

export const annotationTemplateRecords: Record<
    string,
    AnnotationRedisRepositoryBaseClass<AnnotationProperties, NohmModel>
> = {
    1: new ShareChatSocialRealTimeRedisRepository(
        'Sharechat Social RealTime',
        redis,
    ),
    2: new TattleRealTimeRedisRepository('Tattle RealTime', redis),
};
