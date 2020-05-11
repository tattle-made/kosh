import {
    ShareChatAnnotationProperties,
    ShareChatAnnotationPropertyType,
} from './ShareChatAnnotationDataModel';
import {
    TattleAnnotationProperties,
    TattleAnnotationPropertyType,
} from './TattleAnnotationProperties';

export type AnnotationProperties =
    | ShareChatAnnotationPropertyType
    | TattleAnnotationPropertyType;

let test: AnnotationProperties;
const test2: ShareChatAnnotationPropertyType = {
    key: 'hi',
    emotion: 'joy',
    factual_claim: true,
    verifiable: true,
    place: true,
    citizen_journalism: true,
    cta: true,
    fact_checked: true,
    users: 'hi',
};
test = test2;

console.log(test);
