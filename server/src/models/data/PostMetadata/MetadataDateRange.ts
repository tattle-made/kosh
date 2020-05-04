import * as Sequelize from 'sequelize';
import db from '../../../service/db';
import { MetadataDateRangeCreateRequest, MetadataIndexCreateRequest, MetadataDateRangeUpdateRequest } from '../../request/PostMetadataRequest';
import { MetadataIndex, create as createIndex } from '../MetadataIndex';
import { MetadataHistoryDateRange } from '../PostMetadataHistory/MetadataHistoryDateRange';

export class MetadataDateRange extends Sequelize.Model {}
const Op = Sequelize.Op;

MetadataDateRange.init(
    {
        post_id: Sequelize.INTEGER,
        start_date: Sequelize.DATEONLY,
        end_date: Sequelize.DATEONLY,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_daterange',
        modelName: 'metadataDateRange',
        timestamps: false
    },
);

//Post.belongsTo(User);

export async function create(param: MetadataDateRangeCreateRequest): Promise<any> {
    var transaction = await db.get().transaction();
    try
    {
        var item: any = await MetadataDateRange.create(param.getAll(), {transaction: transaction});
        item = await item!.get({plain : true});
        var indexItem: any = await createIndex(new MetadataIndexCreateRequest({metadata_type: 4, metadata_id: item.id, post_id: param.post_id}));
        await transaction.commit();
        return Promise.resolve({...item, metadata_id: item.id, id: indexItem.id});
    }
    catch(err)
    {
        await transaction.rollback();
        return Promise.resolve({
            message: 'Error Creating DateRange item',
            error: JSON.stringify(err),
        });
    }
}

export function update(param: MetadataDateRangeUpdateRequest): Promise<any> {
    return MetadataIndex.findOne({
        where: {
            id: param.id,
        }
    })
    .then((metadataIndex) => {
        let metadataIndexObj: any = metadataIndex!.get({plain:true});
        return  MetadataDateRange.findOne({
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
            var historyItem: MetadataHistoryDateRange = await MetadataHistoryDateRange.create(insertPayload, {transaction: transaction});
            await metadataItem!.update({start_date: param.start_date, end_date: param.end_date, created_by: param.created_by, created_at: param.created_at});
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
    return MetadataDateRange.findOne({
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