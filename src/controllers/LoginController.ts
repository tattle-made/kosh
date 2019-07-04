import _BaseController from './_BaseController';
import {exists} from '../models/data/UserDb';
import {createOrUpdateTokenForUserId} from '../models/data/AuthDb';
import ExistsResponse from '../models/data/ExistsResponse';

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
}
