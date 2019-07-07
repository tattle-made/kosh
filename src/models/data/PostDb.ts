import * as Sequelize from 'sequelize';
import db from '../../service/db';

export class Post extends Sequelize.Model {}

Post.init({
    type : Sequelize.ENUM('text', 'image', 'video'),
    data: Sequelize.STRING,
    filename: Sequelize.STRING,
    source: Sequelize.INTEGER,
}, {
    sequelize: db.get(),
    modelName: 'post',
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

export function create(type: string, data: string, filename: string, source: number):
Promise<JSON> {
    return Post.create({
        type,
        data,
        filename,
        source,
    })
    .then((res: Post) => res.toJSON())
    .catch((err) => Promise.resolve({
        message : 'Error creating Post',
        error : err.toJSON(),
    }));
}

export function getAll() {
    return Post.findAll({
        limit: 10,
    })
    .map((el) => el.get({ plain: true }))
    .catch((err) => {
        return Promise.resolve({
            message : 'Error creating Post',
            error : err,
        });
    });
}

export function get(id: number) {
    return Post.findOne({
        where : {
            id,
        },
    })
    .catch((err) => console.log(err));
}
