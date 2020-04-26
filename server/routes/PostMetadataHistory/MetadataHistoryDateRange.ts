import * as Sequelize from 'sequelize';
import db from '../db';

export class MetadataHistoryDateRange extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataHistoryDateRange.init(
    {
        item_id: Sequelize.INTEGER,
        start_date: Sequelize.DATEONLY,
        end_date: Sequelize.DATEONLY,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        moved_at: Sequelize.DATE
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_history_daterange',
        modelName: 'metadataHistoryDateRange',
        timestamps: false
    },
);

//Post.belongsTo(User);

export function get(id: number) {
    return MetadataHistoryDateRange.findOne({
        where: {
            id,
        }
    })
    .then( (item) => Promise.resolve(item!.get({ plain: true })) )
    .catch((err) => 
        Promise.resolve({
            message: 'Error get DateRange item',
            error: err,
        })
    );
}