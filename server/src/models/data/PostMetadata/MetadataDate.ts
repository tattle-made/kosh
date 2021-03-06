import * as Sequelize from 'sequelize';
import db from '../../../service/db';
import { MetadataDateCreateRequest, MetadataDateUpdateRequest, MetadataIndexCreateRequest } from '../../request/PostMetadataRequest';
import { MetadataIndex, create as createIndex } from '../MetadataIndex';
import { MetadataHistoryDate } from '../PostMetadataHistory/MetadataHistoryDate';

export class MetadataDate extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataDate.init(
    {
        post_id: Sequelize.INTEGER,
        date: Sequelize.DATEONLY,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_date',
        modelName: 'metadataDate',
        timestamps: false
    },
);

//Post.belongsTo(User);

export async function create(param: MetadataDateCreateRequest): Promise<any> {
    var transaction = await db.get().transaction();
    try
    {
        var item: any = await MetadataDate.create(param.getAll(), {transaction: transaction});
        item = await item!.get({plain : true});
        var indexItem: any = await createIndex(new MetadataIndexCreateRequest({metadata_type: 3, metadata_id: item.id, post_id: param.post_id}));
        await transaction.commit();
        return Promise.resolve({...item, metadata_id: item.id, id: indexItem.id});
    }
    catch(err)
    {
        await transaction.rollback();
        return Promise.resolve({
            message: 'Error Creating Date item',
            error: JSON.stringify(err),
        });
    }
}


export function update(param: MetadataDateUpdateRequest): Promise<any> {
    return MetadataIndex.findOne({
        where: {
            id: param.id,
        }
    })
    .then((metadataIndex) => {
        let metadataIndexObj: any = metadataIndex!.get({plain:true});
        return  MetadataDate.findOne({
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
            var historyItem: MetadataHistoryDate = await MetadataHistoryDate.create(insertPayload, {transaction: transaction});
            await metadataItem!.update({date: param.date, created_by: param.created_by, created_at: param.created_at});
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
    return MetadataDate.findOne({
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