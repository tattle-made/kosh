import { NohmModel, TTypedDefinitions } from 'nohm';

export interface ShareChatAnnotationProperties {
    key: string;
    emotion: string;
    factual_claim: boolean;
    verifiable: boolean;
    place: boolean;
    citizen_journalism: boolean;
    cta: boolean;
    fact_checked: boolean;
    users: string;
}

type t = keyof ShareChatAnnotationProperties;

export type ShareChatAnnotationPropertyType = ShareChatAnnotationProperties;

export type ShareChatAnnotationPropertyOptionalType = Partial<
    ShareChatAnnotationProperties
>;

export class ShareChatAnnotationRedisDataModel extends NohmModel<
    ShareChatAnnotationProperties
> {
    public static modelName = 'annotation-room-shar-soc';
    protected static definitions: TTypedDefinitions<
        ShareChatAnnotationProperties
    > = {
        key: {
            type: 'string',
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
        users: {
            type: 'json',
        },
    };
}
