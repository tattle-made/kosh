import _BaseController from "./_BaseController";
import { exists, getById } from "../models/data/UserDb";
import {
    createOrUpdateTokenForUserId,
    createOrUpdateTokenForUserIdToken,
    deleteToken,
    existsToken
    // getUserRole
} from "../models/data/AuthDb";
import ExistsResponse from "../models/data/ExistsResponse";
import ExistsResponseToken from "../models/data/ExistsResponseToken";
import LogoutResponse from "../models/response/LogoutResponse";

import { logError } from "../service/logger";

export class LoginController extends _BaseController {
    constructor() {
        super("login controller");
    }

    public login(username: string, password: string): Promise<any> {
        return exists(username, password)
            .then(result => {
                if (result.status) {
                    return createOrUpdateTokenForUserIdToken(result.userId);
                } else {
                    return new ExistsResponseToken(false, -1, "");
                }
            })
            .catch(err => console.log(err));
    }

    // .then((result: ExistsResponse) => {
    //     if (result.status) {
    //         let token;
    //         let user;
    //         // getById(result.userId).then(result => {
    //         //     console.log("login user ", result);
    //         //     user = result;
    //         // });
    //         // console.log("inside login controller");
    //         // console.log("token", token);
    //         // console.log("user", user);
    //         // // return { token };
    //         createOrUpdateTokenForUserId(result.userId).then(result => {
    //             console.log(
    //                 "login fs111111111111111111111111111111114444444444444444 ",
    //                 result
    //             );
    //             token = result;
    //             console.log("login fs ", token);
    //             return { token };
    //         //         });
    //             } else {
    //                 // return Promise.resolve("zzzz-zzzz-zzzzzz-zzz");
    //                 return {
    //                     token: "zzzz-zzzz-zzzzzz-zzz"
    //                 };
    //             }

    //             // return createOrUpdateTokenForUserId(result.userId);
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             return "failure token";
    //         });
    // }

    public logout(token: string) {
        return deleteToken(token)
            .then((numOfRows: number) => LogoutResponse.create(numOfRows).get())
            .catch(err => logError(err));
    }

    public existsToken(token: any): Promise<ExistsResponse> {
        return existsToken(token);
        // .then(token => {
        //     console.log("controller ", token);
        //     return token;
        // })
        // .catch(err => console.log(err));
    }
}
