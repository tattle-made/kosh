import _BaseController from './_BaseController';
import { exists, getById } from '../models/data/UserDb';
import {
    createOrUpdateTokenForUserIdToken,
    deleteToken,
    existsToken,
} from '../models/data/AuthDb';
import ExistsResponseToken from '../models/data/ExistsResponseToken';
import LogoutResponse from '../models/response/LogoutResponse';

import { logError } from '../service/logger';
import { LoginController as NewLoginController } from '../routes/login/LoginController';

const newLoginController = new NewLoginController();

// todo : please fix the hardcoded 'author' field
export class LoginController extends _BaseController {
    constructor() {
        super('login controller');
    }

    public login(username: string, password: string) {
        let response: ExistsResponseToken;

        return exists(username, password)
            .then((result) => {
                console.log(result);
                if (result.status) {
                    return createOrUpdateTokenForUserIdToken(result.userId);
                } else {
                    return new ExistsResponseToken(false, -1, '');
                }
            })
            .then((data) => {
                response = data;
                return newLoginController.addTokenToStore(data.token, data.userId, 'author');
            })
            .then(() => response)
            .catch((err) => {
                return Promise.resolve({
                    message: 'Error Finding User',
                    error: err,
                });
            });
    }

    public logout(token: string) {
        return deleteToken(token)
            .then((numOfRows: number) => LogoutResponse.create(numOfRows).get())
            .catch((err) => logError(err));
    }

    public existsToken(token: string) {
        return existsToken(token);
    }
}
