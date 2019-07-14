import * as Sequelize from "sequelize";
import db from "../../service/db";
import { v1 as uuid } from "uuid";
import { logError } from "../../service/logger";

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
        .then(val => token)
        .catch(err => console.log(err));
}

export function deleteToken(token: string): Promise<number> {
    return Auth.destroy({ where: { token } }).catch(err => logError(err));
}

// createOrUpdateTokenForUserId(1)
// .then((val) => console.log(val))
// .catch((err) => console.log(err));
