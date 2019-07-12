import _BaseController from "./_BaseController";
import {
  exists,
  createUser,
  updateUser,
  deleteUser
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

  public createUser(param: UserCreateRequest) {
    return createUser(param);
  }

  public updateUser(id: number, param: UserCreateRequest) {
    return updateUser(id, param);
  }

  public deleteUser(id: number) {
    return deleteUser(id);
  }

  public logout(token: string) {
    return deleteToken(token)
      .then((numOfRows: number) => LogoutResponse.create(numOfRows).get())
      .catch(err => logError(err));
  }
}
