import * as Sequelize from 'sequelize';
import db from '../../service/db';
import { v1 as uuid } from 'uuid';
import { logError } from '../../service/logger';
import ExistsResponse from '../response/ExistsResponse';
import ExistsResponseToken from '../response/ExistsResponseToken';
import { LoginController } from '../../routes/login/LoginController';

const loginController = new LoginController();

export class Auth extends Sequelize.Model {}

Auth.init(
    {
        token: Sequelize.STRING,
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize: db.get(),
        modelName: 'token',
    },
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
    const token = uuid();
    return Auth.upsert(
        {
            token,
            user_id: userId,
        },
        { returning: true },
    )
        .then((val) => {
            return token;
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error getting user',
                error: err,
            });
        });
}

export function createOrUpdateTokenForUserIdToken(
    userId: number,
    role: string,
): Promise<ExistsResponseToken> {
    const token = uuid();
    return Auth.upsert(
        {
            token,
            user_id: userId,
        },
        { returning: true },
    )
        .then((val) => {
            console.log('---> ', val);
            return new ExistsResponseToken(true, userId, token, role);
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error creating user token',
                error: err,
            });
        });
}

export function deleteToken(token: string): Promise<number> {
    let count: number;
    return Auth.destroy({ where: { token } })
    .then((cnt) => count = cnt)
    .then(() => loginController.deleteToken(token))
    .then(() => count)
    .catch((err) => logError(err));
}

export function existsToken(token: string): Promise<ExistsResponse> {
    return loginController.isLoggedIn(token)
    .then((result) => {
        return new ExistsResponse(true, result.payload.userProperties.id, result.payload.userProperties.role)
    })
    .catch((err) => {
        return new ExistsResponse(false, -1, '');
    });
}
