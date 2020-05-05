import _BaseController from '../../controllers/_BaseController';
import { Redis } from '../../service/redis';
import { UserTokenORMModel } from './UserTokenModel';
import {
    RedisOperationResult,
    RedisOperationResultType,
} from './RedisOperationResult';

export class LoginController extends _BaseController {
    private redis: Redis;
    constructor() {
        super('/login');
        this.redis = new Redis();
    }

    public addTokenToStore(token: string, userId: number, role: string) {
        // save to redis
        return this.redis
            .getORM()
            .factory<UserTokenORMModel>('user-token')
            .then((userToken) => {
                userToken.property({
                    token,
                    userId,
                    role,
                });
                return userToken.save();
            })
            .then((userToken) =>
                RedisOperationResult.dataFactory('token saved', {
                    userId,
                }),
            )
            .catch((err) =>
                RedisOperationResult.errorFactory('error saving token', err),
            );
    }

    public isLoggedIn(token: string): Promise<RedisOperationResultType> {
        // check in redis
        return this.redis
            .getORM()
            .factory<UserTokenORMModel>('user-token')
            .then((userToken: UserTokenORMModel) => {
                console.log(userToken.allProperties());
                return userToken
                    .find({ token })
                    .then((user) => userToken.load(user[0]))
                    .then((userProperties) =>
                        RedisOperationResult.dataFactory('login check result', {
                            userProperties,
                        }),
                    )
                    .catch((err) =>
                        RedisOperationResult.errorFactory(
                            'login check error',
                            err,
                        ),
                    );
            });
    }

    public deleteToken(token: string) {
        let userTokenModel: UserTokenORMModel;

        return this.redis
            .getORM()
            .factory<UserTokenORMModel>('user-token')
            .then((userToken) => {
                userTokenModel = userToken;
                return userToken.find({ token });
            })
            .then((userIds) => {
                userTokenModel.id = userIds[0];
                return userTokenModel.remove();
            })
            .then((data) =>
                RedisOperationResult.dataFactory('token deleted', {
                    data,
                }),
            )
            .catch((err) =>
                RedisOperationResult.errorFactory('error deleting token', err),
            );
    }
}
