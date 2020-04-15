import { NohmModel, TTypedDefinitions } from 'nohm';
import redis from '../../service/redis';

export interface UserTokenProperties {
    token: string;
    userId: number;
    role: string;
}

export class UserTokenORMModel extends NohmModel<UserTokenProperties> {
    public static modelName = 'user-token';
    protected static definitions: TTypedDefinitions<UserTokenProperties> = {
        token: {
            type: 'string',
            unique: true,
            index: true,
        },
        userId: {
            type: 'number',
        },
        role: {
            type: 'string',
        },
    };
}

