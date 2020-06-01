import { NohmModel, TTypedDefinitions } from 'nohm';

export interface TattleAnnotationProperties {
    key: string;
    language: string;
}

export type TattleAnnotationPropertyType = TattleAnnotationProperties;

export type TattleAnnotationPropertyOptionalType = Partial<
    TattleAnnotationProperties
>;

export class TattleAnnotationRedisDataModel extends NohmModel<
    TattleAnnotationProperties
> {
    public static modelName = 'annotation-room-tattle';
    protected static definitions: TTypedDefinitions<
        TattleAnnotationProperties
    > = {
        key: {
            type: 'string',
            unique: true,
            index: true,
        },
        language: {
            type: 'string',
        },
    };
}
