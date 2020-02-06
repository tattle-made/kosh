import _BaseController from '../../controllers/_BaseController';
import redis from '../../service/redis';
import { UserTokenORMModel } from './UserTokenModel';
import { RedisOperationResult } from './RedisOperationResult';

export class LoginController extends _BaseController {
    constructor() {
        super('/login');
    }

    public addTokenToStore(token: string, userId: number, role: string) {
        // save to redis
        return redis.getORM().factory<UserTokenORMModel>('user-token')
        .then((userToken) => {
            userToken.property({
                token,
                userId,
                role,
            });
            return userToken.save();
        })
        .then((userToken) => RedisOperationResult.dataFactory('token saved', {userId}))
        .catch((err) => RedisOperationResult.errorFactory('error saving token', err));
    }

    public isLoggedIn(token: string) {
        // check in redis
        return redis.getORM().factory<UserTokenORMModel>('user-token')
        .then((userToken) => {
            // console.log(userToken.allProperties());
            return userToken.find({token})
            .then((user) => {
                const loginStatus = user.length === 0 ? false : true;
                return RedisOperationResult.dataFactory('login check result', {loginStatus});
            })
            .catch((err) => RedisOperationResult.errorFactory('login check error', err));
        });
    }

    public deleteToken(token: string) {
        let userTokenModel: UserTokenORMModel;

        return redis.getORM().factory<UserTokenORMModel>('user-token')
        .then((userToken) => {
            userTokenModel = userToken;
            return userToken.find({token});
        })
        .then((userIds) => {
            userTokenModel.id = userIds[0];
            return userTokenModel.remove();
        })
        .then((data) => RedisOperationResult.dataFactory('token deleted', {data}))
        .catch((err) => RedisOperationResult.errorFactory('error deleting token', err));
    }
}
