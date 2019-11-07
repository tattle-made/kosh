import * as Sequelize from 'sequelize';
import db from '../../service/db';
import {Promise} from 'bluebird';

export class FactCheckedStory extends Sequelize.Model {}

FactCheckedStory.init({
        storyId: Sequelize.STRING,
        docId: Sequelize.STRING,
        url: Sequelize.STRING,
        type: Sequelize.ENUM('text', 'image', 'video'),
    },
    {
        sequelize: db.get(),
        modelName: 'factCheckedStory',
    },
);

