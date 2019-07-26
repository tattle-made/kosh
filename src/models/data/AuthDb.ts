import * as Sequelize from "sequelize";
import db from "../../service/db";
import { v1 as uuid } from "uuid";
import { logError } from "../../service/logger";
import ExistsResponse from "./ExistsResponse";
import ExistsResponseToken from "./ExistsResponseToken";

export class Auth extends Sequelize.Model {}

Auth.init(
    {
        token: Sequelize.STRING,
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        }
    },
    {
        sequelize: db.get(),
        modelName: "token"
    }
);

// Auth.sync({force:true})
// .then(() => {
//     Auth.create({
//         token: 'gggg-gggg-gggg',
//         user_id: 1,
//     });
// })
// .then((jane) => {
//     console.log(jane);
// });

export function createOrUpdateTokenForUserId(userId: number): Promise<string> {
    // return Promise.resolve(uuid());
    const token = uuid();
    return Auth.upsert(
        {
            token,
            user_id: userId
        },
        { returning: true }
    )
        .then(val => {
            // console.log("token craet ", token);
            return token;
        })
        .catch(err => console.log(err));
}

export function createOrUpdateTokenForUserIdToken(
    userId: number
): Promise<ExistsResponseToken> {
    // return Promise.resolve(uuid());
    const token = uuid();
    return Auth.upsert(
        {
            token,
            user_id: userId
        },
        { returning: true }
    )
        .then(val => {
            return new ExistsResponseToken(true, userId, token);
        })
        .catch(err => console.log(err));
}

export function deleteToken(token: string): Promise<number> {
    return Auth.destroy({ where: { token } }).catch(err => logError(err));
}

// createOrUpdateTokenForUserId(1)
// .then((val) => console.log(val))
// .catch((err) => console.log(err));

export function existsToken(token: string): Promise<ExistsResponse> {
    return Auth.findOne({
        where: {
            token
        }
    })
        .then(data => {
            console.log("auth db 00dasfsdsssssssss", data);
            if (data) {
                const user_id = data.get("user_id") as number;
                return new ExistsResponse(true, user_id);
            } else {
                return new ExistsResponse(false, -1);
            }
        })
        .catch(err => console.log(err));
}
