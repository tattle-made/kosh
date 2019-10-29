import * as Sequelize from 'sequelize';
import db from '../../service/db';
import { PostCreateRequest } from '../request/PostCreateRequest';

export class Post extends Sequelize.Model {}
const Op = Sequelize.Op;

Post.init(
    {
        type: Sequelize.ENUM('text', 'image', 'video'),
        data: Sequelize.STRING,
        filename: Sequelize.STRING,
        user_id: Sequelize.INTEGER,
    },
    {
        sequelize: db.get(),
        modelName: 'post',
    },
);

// Post.afterCreate( () => {
//     console.log('post Created');
// });

Post.sync({alter:true})
.then(() => {
    console.log('POST SYNCED');
});

export function create(param: PostCreateRequest): Promise<JSON> {
    return Post.create(param.getAll())
        .then((post: Post) => post.get({ plain: true }))
        .catch((err) =>
            Promise.resolve({
                message: 'Error Creating Post',
                error: err.toJSON(),
            }),
        );
}

export function getAll(page: number): Promise<object> {
    const pageSize = 10;
    return Post.findAndCountAll({
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [['createdAt', 'DESC']],
    })
        .then((result) => {
            return {
                page,
                totalPages: Math.ceil(result.count / pageSize),
                count: result.count,
                posts: result.rows,
            };
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}

export function get(id: number) {
    return Post.findOne({
        where: {
            id,
        },
    }).catch((err) => {
        return Promise.resolve({
            message: 'Error Fetching Post',
            error: err,
        });
    });
}

export function getByTime(
    page: number,
    d1: string,
    d2: string,
): Promise<object> {
    const pageSize = 10;
    return Post.findAndCountAll({
        where: {
            createdAt: {
                [Op.between]: [d1, d2],
            },
        },
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [['createdAt', 'DESC']],
    })
        .then((result) => {
            return {
                page,
                count: result.count,
                totalPages: Math.ceil(result.count / pageSize),
                posts: result.rows,
            };
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}

export function getByTimeAndUsers(
    userId: number,
    page: number,
    d1: string,
    d2: string,
): Promise<object> {
    const pageSize = 10;
    return Post.findAndCountAll({
        where: {
            user_id: userId,
            createdAt: {
                [Op.between]: [d1, d2],
            },
        },
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [['createdAt', 'DESC']],
    })
        .then((result) => {
            return {
                page,
                count: result.count,
                totalPages: Math.ceil(result.count / pageSize),
                posts: result.rows,
            };
        })
        .catch((err) => {
            return Promise.resolve({
                message: 'Error Fetching Post',
                error: err,
            });
        });
}

export function deletePost(id: number) {
    return Post.destroy({
        where: {
            id,
        },
    })
        .then((post) => {
            if (post) {
                return 'post deleted';
            } else {
                return 'no post found';
            }
        })
        .catch((err) =>
            Promise.resolve({
                message: 'Error Deleting Post',
                error: err.toJSON(),
            }),
        );
}
