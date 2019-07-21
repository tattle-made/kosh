import * as Sequelize from "sequelize";
import db from "../../service/db";
import { PostCreateRequest } from "../request/PostCreateRequest";

export class Post extends Sequelize.Model {}
const Op = Sequelize.Op;

Post.init(
    {
        type: Sequelize.ENUM("text", "image", "video"),
        data: Sequelize.STRING,
        filename: Sequelize.STRING,
        source: Sequelize.INTEGER,
        campaign_id: Sequelize.INTEGER,
        user_id: Sequelize.INTEGER
    },
    {
        sequelize: db.get(),
        modelName: "post"
    }
);

Post.afterCreate(function() {
    console.log("post Created");
});

// Post.sync({force: true})
// .then(() => {
//     Post.create({
//         type : 'image',
//         data : '',
//         filename: 'asfd-asdfasdfadf-adsff-adf',
//         source: 2
//     });
// });

export function create(param: PostCreateRequest): Promise<JSON> {
    return Post.create(param.getAll())
        .then((post: Post) => post.get({ plain: true }))
        .catch(err =>
            Promise.resolve({
                message: "Error creating Post",
                error: err.toJSON()
            })
        );
}

export function getAll(page: number) {
    const pageSize = 10;
    return Post.findAndCountAll({
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [["createdAt", "DESC"]]
    })
        .then(result => {
            return {
                page: page,
                totalPages: Math.ceil(result.count / pageSize),
                posts: result.rows,
                count: result.count
            };
        })
        .catch(err => {
            return Promise.resolve({
                message: "Error Fetching Post",
                error: err
            });
        });
}

export function get(id: number) {
    return Post.findOne({
        where: {
            id
        }
    }).catch(err => console.log(err));
}

export function getByTime(page: number, d1: string, d2: string) {
    const pageSize = 10;
    return Post.findAndCountAll({
        where: {
            createdAt: {
                [Op.between]: [d1, d2]
            }
        },
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [["createdAt", "DESC"]]
    })
        .then(result => {
            return {
                page: page,
                count: result.count,
                totalPages: Math.ceil(result.count / pageSize),
                posts: result.rows
            };
        })
        .catch(err => {
            return Promise.resolve({
                message: "Error Fetching Post",
                error: err
            });
        });
}

export function getByTimeAndUsers(
    user_id: any,
    page: number,
    d1: string,
    d2: string
) {
    const pageSize = 10;
    return Post.findAndCountAll({
        where: {
            user_id: user_id,
            createdAt: {
                [Op.between]: [d1, d2]
            }
        },
        offset: page * pageSize - pageSize,
        limit: 10,
        order: [["createdAt", "DESC"]]
    })
        .then(result => {
            return {
                page: page,
                count: result.count,
                totalPages: Math.ceil(result.count / pageSize),
                posts: result.rows
            };
        })
        .catch(err => {
            return Promise.resolve({
                message: "Error Fetching Post",
                error: err
            });
        });
}

export function deletePost(id: number): Promise<any> {
    return Post.destroy({
        where: {
            id
        }
    })
        .then(post => {
            return post;
        })
        .catch(err =>
            Promise.resolve({
                message: "Error Deleting Post",
                error: err.toJSON()
            })
        );
}
