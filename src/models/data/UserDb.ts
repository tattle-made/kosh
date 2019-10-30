import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import db from '../../service/db';
import ExistsResponse from '../response/ExistsResponse';
import { UserCreateRequest } from '../request/UserCreateRequest';
import { UserCreateResponse } from '../response/UserCreateResponse';
import { MediaSource } from './MediaSource';

export class User extends Sequelize.Model {}

User.init(
    {
        username: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.STRING,
        role: Sequelize.STRING,
    },
    {
        sequelize: db.get(),
        modelName: 'user',
    },
);

User.belongsTo(MediaSource);

// User.sync({alter: true})
// .then(() => console.log('user synced'))
// .catch((err) => console.log(err));

// MediaSource.belongsTo(User);

// db.get().sync({alter : true});

// User.sync({alter : true})
// .then(() => {
//     console.log('synced user');
// })
// .catch((err) => console.log(err));

// returns false and {}
// returns true and {userid : <id>}

export function exists(
    username: string,
    password: string,
): Promise<ExistsResponse> {
    return User.findAndCountAll({
        where: {
            username,
        },
    })
        .then((result) => {
            if (result.count === 0) {
                return new ExistsResponse(false, -1);
            } else {
                return bcrypt
                    .compare(password, result.rows[0].get('password') as string)
                    .then((res) => {
                        if (res === true) {
                            return new ExistsResponse(true, result.rows[0].get(
                                'id',
                            ) as number);
                        } else {
                            return new ExistsResponse(false, -1);
                        }
                    })
                    .catch((err) => {
                        return Promise.resolve({
                            message: 'Error Fetching Post',
                            error: err,
                        });
                    });
            }
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
    // .then((user) => user.id != undefined ? true : false;)
}

// export function getAll() {
//     return User.findAll({
//         order: [["createdAt", "DESC"]]
//     })
//         .map(el => el.get({ plain: true }))
//         .catch(err => {
//             return Promise.resolve({
//                 message: "Error creating Post",
//                 error: err
//             });
//         });
// }

export function getCompleteList() {
    return User.findAndCountAll({
        order: [['createdAt', 'DESC']],
    })
        .then((result) => {
            return {
                users: result.rows,
                count: result.count,
            };
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}

export function getAll(page: number) {
    const pageSize = 10;
    return User.findAndCountAll({
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [['createdAt', 'DESC']],
    })
        .then((result) => {
            return {
                page,
                totalPages: Math.ceil(result.count / pageSize),
                count: result.count,
                users: result.rows,
            };
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}

export function getById(id: number) {
    return User.findOne({
        where: {
            id,
        },
    })
        .then((user) => {
            return user;
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}

export function create(param: UserCreateRequest): Promise<UserCreateResponse> {
    return User.create(param.getAll())
        .then((user: any) => {
            return new UserCreateResponse(
                user.id,
                user.username,
                user.email,
                user.role,
            );
        })
        .catch((err) => {
            Promise.resolve({
                message: 'Error creating User',
                error: err.toJSON(),
            });
        });
}

export function update(id: number, param: UserCreateRequest) {
    return User.update(
        {
            username: param.username,
            password: param.password,
            email: param.email,
            role: param.role,
        },
        {
            where: {
                id,
            },
        },
    )
        .then((user) => {
            return user;
        })
        .catch((err) =>
            Promise.resolve({
                message: 'Error Updating User',
                error: err.toJSON(),
            }),
        );
}

export function deleteUser(id: number) {
    return User.destroy({
        where: {
            id,
        },
    })
        .then((user) => {
            if (user) {
                return 'user deleted';
            } else {
                return 'user not found';
            }
        })
        .catch((err) =>
            Promise.resolve({
                message: 'Error Deleting User',
                error: err.toJSON(),
            }),
        );
}

export function getUserRole(id: number): Promise<string> {
    return User.findOne({
        where: {
            id,
        },
    })
        .then((user) => {
            if (user) {
                return user.get('role');
            }
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}
