import { Redis } from '../../../../service/redis';
import {
    ShareChatAnnotationPropertyType,
    ShareChatAnnotationRedisDataModel,
    ShareChatAnnotationPropertyOptionalType,
} from './ShareChatAnnotationDataModel';
import { AnnotationRedisRepositoryBaseClass } from '../AnnotationRedisRepositoryBaseClass';
import { Nohm, NohmModel, TTypedDefinitions } from 'nohm';

export class ShareChatSocialRealTimeRedisRepository extends AnnotationRedisRepositoryBaseClass<
    ShareChatAnnotationPropertyType,
    ShareChatAnnotationRedisDataModel
> {}
