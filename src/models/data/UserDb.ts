import * as Sequelize from 'sequelize';
import db from '../../service/db';
import ExistsResponse from '../data/ExistsResponse';

export class User extends Sequelize.Model {}

User.init({
    username: Sequelize.STRING,
    password: Sequelize.STRING,
},
{
    sequelize: db.get(),
    modelName: 'user',
});

// User.sync()
// .then(() => {
//     User.create({
//         username: 'user_aab',
//         password: 'abcdf',
//     });
// })
// .then((jane) => {
//     console.log(jane);
// });

// returns false and {}
// returns true and {userid : <id>}

export function exists(username: string, password: string): Promise<ExistsResponse> {
    return User.findAndCountAll({
        where: {
            username,
            password,
        },
    })
    .then((result) => {
        if (result.count === 0) {
            return new ExistsResponse(false, -1);
        } else {
            return new ExistsResponse(true, result.rows[0].get('id') as number);
        }
    })
    .catch((err) => {
        console.log(err);
    });
    // .then((user) => user.id != undefined ? true : false;)
}

