import * as Sequelize from 'sequelize';
import db from '../../service/db';
import { PostCreateRequest } from '../request/PostCreateRequest';
import {Promise} from 'bluebird';
import axios from 'axios';

export class Post extends Sequelize.Model {}
const Op = Sequelize.Op;


import {User} from './UserDb';
import { MediaSource } from './MediaSource';

export function deduceMediaUrl(serviceName: string, dirName: string, fileName: string) {
    switch (serviceName) {
        case 'aws':
            return `https://${dirName}.s3.ap-south-1.amazonaws.com/${fileName}`;
        case 'firebase':
            // tslint:disable-next-line:max-line-length
            return `https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/${dirName}%2F${fileName}?alt=media&token=bd030137-3020-42ac-be32-4eaab299dc5c`;
    }
}

export function appendMediaUrlToPost(post: Post) {
    if (post instanceof Post) {
        const data: any = post.get({plain: true});
        const mediaUrl = deduceMediaUrl(
            data.user.mediaSource.serviceName,
            data.user.mediaSource.dirName,
            data.filename);
        return { ...data, mediaUrl };
    } else {
        return post;
    }
}

Post.init(
    {
        type: Sequelize.ENUM('text', 'image', 'video'),
        userId: Sequelize.INTEGER,
        data: Sequelize.STRING,
        filename: Sequelize.STRING,
        indexed_for_search: {type: Sequelize.BOOLEAN, defaultValue: false},
    },
    {
        sequelize: db.get(),
        modelName: 'post',
    },
);

Post.belongsTo(User);

// Post.afterCreate( () => {
//     console.log('post Created');
// });

// Post.sync({alter:true})
// .then(() => {
//     console.log('POST SYNCED');
// });

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
        include: [
            {
                model: User,
                attributes: ['username'],
                include: [
                    {
                        model: MediaSource,
                        attributes: ['serviceName', 'dirName'],
                    },
                ],
            },
        ],
    })
    .then((result) => {
        const modifiedRows = result.rows.map((resultItem) => {
            return appendMediaUrlToPost(resultItem);
        });
        return {
            page,
            totalPages: Math.ceil(result.count / pageSize),
            count: result.count,
            posts: modifiedRows,
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
        include: [
            {
                model: User,
                attributes: ['username'],
                include: [
                    {
                        model: MediaSource,
                        attributes: ['serviceName', 'dirName'],
                    },
                ],
            },
        ],
    })
    .then((post) => appendMediaUrlToPost(post as Post))
    .catch((err) => {
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

export function indexPendingPosts() {
    console.log('****');
    console.log(`${process.env.SEARCH_HOST}:${process.env.SEARCH_PORT}`);
    return Post.findAll({
        limit: 10,
        where: {
            indexed_for_search: false,
        },
    })
    .then((posts) => {
        console.log('=======INDEXING========');

        const indexPromise = posts.map((post) => {
            console.log(post.get('id'));
            if (post.get('id') === 228) {
                return Promise.resolve('error indexing 228');
            } else {
                return Promise.resolve(`indexing ${post.get('id')}`);
            }
        });
        return Promise.each(indexPromise, (promise) => {
            return promise;
        });
        
        console.log('=======END-INDEXING========');
    })
    .catch((err) => ({message: 'Error operating in Database', error: err.JSON}))
    ;
}
