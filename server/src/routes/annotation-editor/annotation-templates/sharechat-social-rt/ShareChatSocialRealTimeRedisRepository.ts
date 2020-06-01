import {
    ShareChatAnnotationPropertyType,
    ShareChatAnnotationRedisDataModel,
} from './ShareChatAnnotationDataModel';
import { AnnotationRedisRepositoryBaseClass } from '../AnnotationRedisRepositoryBaseClass';

export class ShareChatSocialRealTimeRedisRepository extends AnnotationRedisRepositoryBaseClass<
    ShareChatAnnotationPropertyType,
    ShareChatAnnotationRedisDataModel
> {}
