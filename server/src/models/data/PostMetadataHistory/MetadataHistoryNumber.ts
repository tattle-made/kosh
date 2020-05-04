import * as Sequelize from 'sequelize';
import db from '../../../service/db';

export class MetadataHistoryNumber extends Sequelize.Model {}
const Op = Sequelize.Op;


MetadataHistoryNumber.init(
    {
        item_id: Sequelize.INTEGER,
        value: Sequelize.STRING,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        moved_at: Sequelize.DATE
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_history_number',
        modelName: 'metadataHistoryNumber',
        timestamps: false
    },
);

//Post.belongsTo(User);

export function get(id: number) {
    return MetadataHistoryNumber.findOne({
        where: {
            id,
        }
    })
    .then( (item) => Promise.resolve(item!.get({ plain: true })) )
    .catch((err) => 
        Promise.resolve({
            message: 'Error get Number item',
            error: err,
        })
    );
}