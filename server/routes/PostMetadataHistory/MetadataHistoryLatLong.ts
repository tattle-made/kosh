import * as Sequelize from 'sequelize';
import db from '../db';

export class MetadataHistoryLatLong extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataHistoryLatLong.init(
    {
        item_id: Sequelize.INTEGER,
        latitude: Sequelize.DECIMAL(8,6),
        longitude: Sequelize.DECIMAL(9,6),
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
        moved_at: Sequelize.DATE
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_history_latlong',
        modelName: 'metadataHistoryLatLong',
        timestamps: false
    },
);

//Post.belongsTo(User);

export function get(id: number) {
    return MetadataHistoryLatLong.findOne({
        where: {
            id,
        }
    })
    .then( (item) => Promise.resolve(item!.get({ plain: true })) )
    .catch((err) => 
        Promise.resolve({
            message: 'Error get LatLong item',
            error: err,
        })
    );
}