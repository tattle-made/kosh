import * as Sequelize from 'sequelize';
import db from '../../../service/db';
import { MetadataLatLongCreateRequest, MetadataIndexCreateRequest, MetadataLatLongUpdateRequest } from '../../request/PostMetadataRequest';
import { MetadataIndex, create as createIndex } from '../MetadataIndex';
import { MetadataHistoryLatLong } from '../PostMetadataHistory/MetadataHistoryLatLong';

export class MetadataLatLong extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataLatLong.init(
    {
        post_id: Sequelize.INTEGER,
        latitude: Sequelize.DECIMAL(8,6),
        longitude: Sequelize.DECIMAL(9,6),
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_latlong',
        modelName: 'metadataLatLong',
        timestamps: false
    },
);

//Post.belongsTo(User);

export async function create(param: MetadataLatLongCreateRequest): Promise<any> {
    var transaction = await db.get().transaction();
    try
    {
        var item: any = await MetadataLatLong.create(param.getAll(), {transaction: transaction});
        item = await item!.get({plain : true});
        var indexItem: any = await createIndex(new MetadataIndexCreateRequest({metadata_type: 5, metadata_id: item.id, post_id: param.post_id}));
        await transaction.commit();
        return Promise.resolve({...item, metadata_id: item.id, id: indexItem.id});
    }
    catch(err)
    {
        await transaction.rollback();
        return Promise.resolve({
            message: 'Error Creating LatLong item',
            error: JSON.stringify(err),
        });
    }
}

export function update(param: MetadataLatLongUpdateRequest): Promise<any> {
    return MetadataIndex.findOne({
        where: {
            id: param.id,
        }
    })
    .then((metadataIndex) => {
        let metadataIndexObj: any = metadataIndex!.get({plain:true});
        return  MetadataLatLong.findOne({
            where: {
                id: metadataIndexObj.metadata_id
            }
        })
    })
    .then(async (metadataItem) => {
        let metadataObj: any = metadataItem!.get({plain:true});
        var transaction = await db.get().transaction();
        try
        {
            console.log(metadataObj);
            let insertPayload: any = {...metadataObj, item_id: metadataObj.id, moved_at: param.created_at};
            delete insertPayload.id;
            var historyItem: MetadataHistoryLatLong = await MetadataHistoryLatLong.create(insertPayload, {transaction: transaction});
            await metadataItem!.update({latitude: param.latitude, longitude: param.longitude, created_by: param.created_by, created_at: param.created_at});
            await transaction.commit();
            return Promise.resolve({message: 'success'});
        }
        catch(err)
        {
            await transaction.rollback();
            console.log(err);
            return Promise.resolve({
                message: 'Error Updating Number item',
                error: JSON.stringify(err),
            });
        }
    
    });
}

export function get(id: number) {
    return MetadataLatLong.findOne({
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