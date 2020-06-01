import * as Sequelize from 'sequelize';
import db from '../../../service/db';

export class MetadataHistoryText extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataHistoryText.init(
    {
        item_id: Sequelize.INTEGER,
        value: Sequelize.STRING,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        moved_at: Sequelize.DATE
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_history_text',
        modelName: 'metadataHistoryText',
        timestamps: false
    },
);

//Post.belongsTo(User);

export function get(id: number) {
    return MetadataHistoryText.findOne({
        where: {
            id,
        }
    })
    .then( (item) => Promise.resolve(item!.get({ plain: true })) )
    .catch((err) => 
        Promise.resolve({
            message: 'Error get Text item',
            error: err,
        })
    );
}