import { NohmModel, TTypedDefinitions } from 'nohm';

export interface AnnotationProperties {
    id: number;
    emotion: string;
    factual_claim: boolean;
    verifiable: boolean;
    place: boolean;
    citizen_journalism: boolean;
    cta: boolean;
    fact_checked: boolean;
}

export type AnnotationType = AnnotationProperties;

export class AnnotationRedisDataModel extends NohmModel<AnnotationProperties> {
    public static modelName = 'annotation-room';
    protected static definitions: TTypedDefinitions<AnnotationProperties> = {
        id: {
            type: 'number',
            unique: true,
            index: true,
        },
        emotion: {
            type: 'string',
        },
        factual_claim: {
            type: 'boolean',
        },
        verifiable: {
            type: 'boolean',
        },
        place: {
            type: 'boolean',
        },
        citizen_journalism: {
            type: 'boolean',
        },
        cta: {
            type: 'boolean',
        },
        fact_checked: {
            type: 'boolean',
        },
    };
}
