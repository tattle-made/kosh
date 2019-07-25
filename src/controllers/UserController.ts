import _BaseController from "./_BaseController";
import {
    exists,
    create,
    update,
    deleteUser,
    getAll,
    getUserRole,
    getCompleteList,
    getById
} from "../models/data/UserDb";
import {
    createOrUpdateTokenForUserId,
    deleteToken
} from "../models/data/AuthDb";
import ExistsResponse from "../models/data/ExistsResponse";
import LogoutResponse from "../models/response/LogoutResponse";

import { logError } from "../service/logger";
import { UserCreateRequest } from "src/models/request/UserCreateRequest";

export class UserController extends _BaseController {
    constructor() {
        super("user controller");
    }

    // public create(username: string, password: string, email: string, role: string): Promise<string> {
    //     return exists(username, password)
    //     .then((result: ExistsResponse) => {
    //         if (result.status) {
    //             // return createOrUpdateTokenForUserId(result.userId);
    //             return {

    //             }
    //         } else {
    //             return Promise.resolve('zzzz-zzzz-zzzzzz-zzz');
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         return 'failure token';
    //     });
    // }

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
        return create(param);
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
            .catch(err => logError(err));
    }

    public getPermissions(route: string, method: string) {
        if (method === "GET") {
            return ["subscriber", "admin"];
        } else {
            return ["admin"];
        }
    }

    public getUserRole(userId: number) {
        return getUserRole(userId);
    }
}
