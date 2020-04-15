import _BaseController from './_BaseController';
import * as bcrypt from 'bcrypt';
import {
    create,
    update,
    deleteUser,
    getAll,
    getUserRole,
    getCompleteList,
    getById,
} from '../models/data/UserDb';
import { deleteToken } from '../models/data/AuthDb';

import LogoutResponse from '../models/response/LogoutResponse';

import { logError } from '../service/logger';
import { UserCreateRequest } from 'src/models/request/UserCreateRequest';

export class UserController extends _BaseController {
    constructor() {
        super('user controller');
    }

    public getById(id: number) {
        return getById(id);
    }

    public getAll(page: number) {
        return getAll(page);
    }

    public getCompleteList() {
        return getCompleteList();
    }

    public create(param: UserCreateRequest) {
        return bcrypt
            .hash(param.password, 10)
            .then((hash) => {
                param.password = hash;
                return create(param);
            })
            .catch((err) => {
                return Promise.resolve({
                    message: 'Error Creating User',
                    error: err,
                });
            });
    }

    public update(id: number, param: UserCreateRequest) {
        return update(id, param);
    }

    public delete(id: number) {
        return deleteUser(id);
    }

    public logout(token: string) {
        return deleteToken(token)
            .then((numOfRows: number) => LogoutResponse.create(numOfRows).get())
            .catch((err) => logError(err));
    }

    public getPermissions(route: string, method: string): string[] {
        if (method === 'GET') {
            if (route.includes('/users')) {
                return ['admin', 'editor'];
            }
            return ['subscriber', 'admin', 'editor', 'author'];
        } else {
            if (route.includes('/users/update')) {
                return ['editor', 'admin'];
            }
            return ['admin', 'subscriber', 'editor', 'author'];
        }
    }

    public getUserRole(userId: number) {
        return getUserRole(userId);
    }
}
