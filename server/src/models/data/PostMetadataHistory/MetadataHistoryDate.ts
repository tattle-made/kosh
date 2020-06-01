import * as Sequelize from 'sequelize';
import db from '../../../service/db';

export class MetadataHistoryDate extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataHistoryDate.init(
    {
        item_id: Sequelize.INTEGER,
        date: Sequelize.DATEONLY,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        moved_at: Sequelize.DATE
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_history_date',
        modelName: 'metadataHistoryDate',
        timestamps: false
    },
);

//Post.belongsTo(User);

export function get(id: number) {
    return MetadataHistoryDate.findOne({
        where: {
            id,
        }
    })
    .then( (item) => Promise.resolve(item!.get({ plain: true })) )
    .catch((err) => 
        Promise.resolve({
            message: 'Error get Date item',
            error: err,
        })
    );
}