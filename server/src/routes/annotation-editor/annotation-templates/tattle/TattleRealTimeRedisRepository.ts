import { Redis } from '../../../../service/redis';
import { AnnotationRedisRepositoryBaseClass } from '../AnnotationRedisRepositoryBaseClass';
import {
    TattleAnnotationPropertyType,
    TattleAnnotationRedisDataModel,
} from './TattleAnnotationDataModel';

export class TattleRealTimeRedisRepository extends AnnotationRedisRepositoryBaseClass<
    TattleAnnotationPropertyType,
    TattleAnnotationRedisDataModel
> {}
