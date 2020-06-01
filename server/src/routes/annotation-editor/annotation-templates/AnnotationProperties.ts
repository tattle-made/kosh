import { ShareChatAnnotationPropertyType } from './sharechat-social-rt/ShareChatAnnotationDataModel';
import { TattleAnnotationPropertyType } from './tattle/TattleAnnotationDataModel';

export type AnnotationProperties =
    | ShareChatAnnotationPropertyType
    | TattleAnnotationPropertyType;
