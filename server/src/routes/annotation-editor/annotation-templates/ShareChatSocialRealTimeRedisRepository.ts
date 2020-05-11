import { Redis } from '../../../service/redis';
import {
    ShareChatAnnotationPropertyType,
    ShareChatAnnotationRedisDataModel,
    ShareChatAnnotationPropertyOptionalType,
} from './ShareChatAnnotationDataModel';
import { AnnotationRedisRepository } from './AnnotationRedisRepositoryInterface';
import { Nohm, NohmModel, TTypedDefinitions } from 'nohm';

export class ShareChatSocialRealTimeRedisRepository extends AnnotationRedisRepository<
    ShareChatAnnotationPropertyType,
    ShareChatAnnotationRedisDataModel
> {
    constructor(public name: string) {
        super(name);
    }
}
