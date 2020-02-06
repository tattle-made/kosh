import * as Sequelize from 'sequelize';
import db from '../../service/db';
import {Promise} from 'bluebird';
import { GetFactCheckStoryRequestModel } from './GetFactCheckStoryRequestModel';
const Op = Sequelize.Op;

export class FactCheckedStory extends Sequelize.Model {}

FactCheckedStory.init({
        storyId: Sequelize.STRING,
        docId: Sequelize.STRING,
        postId: Sequelize.INTEGER,
        url: Sequelize.STRING,
        type: Sequelize.ENUM('text', 'image', 'video'),
    },
    {
        sequelize: db.get(),
        modelName: 'factCheckedStory',
    },
);


export function getStoryByPostId(id: number) {
     return FactCheckedStory.findOne({
         where: {
             postId: id,
         },
     });
}

export function getAll(param: GetFactCheckStoryRequestModel) {
    const pageSize = 12;

    return FactCheckedStory.findAndCountAll({
        offset : param.page * pageSize - pageSize,
        limit: pageSize,
        order: [['createdAt', 'DESC']],
        where: param.type === 'all' ? {} : { type : {[Op.eq] : param.type}},
    })
    .then((result) => {
        return {
            page: param.page,
            count : result.count,
            totalPages: Math.ceil(result.count / pageSize),
            posts: result.rows,
        };
    })
    .catch((err) => {
        return Promise.resolve({
            message: 'Error getAll',
            error: err,
        });
    });
}
