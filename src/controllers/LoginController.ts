import _BaseController from './_BaseController';
import { exists, getById } from '../models/data/UserDb';
import {
    createOrUpdateTokenForUserId,
    createOrUpdateTokenForUserIdToken,
    deleteToken,
    existsToken
    // getUserRole
} from '../models/data/AuthDb';
import ExistsResponse from '../models/data/ExistsResponse';
import ExistsResponseToken from '../models/data/ExistsResponseToken';
import LogoutResponse from '../models/response/LogoutResponse';

import { logError } from '../service/logger';

export class LoginController extends _BaseController {
    constructor() {
        super('login controller');
    }

    public login(username: string, password: string): Promise<any> {
        return exists(username, password)
            .then(result => {
                if (result.status) {
                    return createOrUpdateTokenForUserIdToken(result.userId);
                } else {
                    return new ExistsResponseToken(false, -1, '');
                }
            })
            .catch(err => console.log(err));
    }

    public logout(token: string) {
        return deleteToken(token)
            .then((numOfRows: number) => LogoutResponse.create(numOfRows).get())
            .catch(err => logError(err));
    }

    public existsToken(token: any): Promise<ExistsResponse> {
        return existsToken(token);
    }
}
