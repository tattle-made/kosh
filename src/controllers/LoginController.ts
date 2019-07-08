import _BaseController from './_BaseController';
import {exists} from '../models/data/UserDb';
import {createOrUpdateTokenForUserId, deleteToken} from '../models/data/AuthDb';
import ExistsResponse from '../models/data/ExistsResponse';
import LogoutResponse from '../models/response/LogoutResponse';

import {logError} from '../service/logger';

export class LoginController extends _BaseController {
    constructor() {
        super('login controller');
    }

    public login(username: string, password: string): Promise<string> {
        return exists(username, password)
        .then((result: ExistsResponse) => {
            if (result.status) {
                return createOrUpdateTokenForUserId(result.userId);
            } else {
                return Promise.resolve('zzzz-zzzz-zzzzzz-zzz');
            }
        })
        .catch((err) => {
            console.log(err);
            return 'failure token';
        });
    }

    public logout(token: string) {
        return deleteToken(token)
        .then((numOfRows: number) => LogoutResponse.create(numOfRows).get())
        .catch((err) => logError(err));
    }
}

