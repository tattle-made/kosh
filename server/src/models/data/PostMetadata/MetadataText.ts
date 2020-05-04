import * as Sequelize from 'sequelize';
import db from '../../../service/db';
import { MetadataTextCreateRequest, MetadataIndexCreateRequest, MetadataTextUpdateRequest } from '../../request/PostMetadataRequest';
import { MetadataIndex, create as createIndex } from '../MetadataIndex';
import { MetadataHistoryText } from '../PostMetadataHistory/MetadataHistoryText';

export class MetadataText extends Sequelize.Model {}
const Op = Sequelize.Op;


//import {User} from './UserDb';
//import { MediaSource } from './MediaSource';

/*
export function deduceMediaUrl(serviceName: string, dirName: string, fileName: string) {
    switch (serviceName) {
        case 'aws':
            return `https://s3.ap-south-1.amazonaws.com/${dirName}/${fileName}`;
        case 'firebase':
            // tslint:disable-next-line:max-line-length
            return `https://firebasestorage.googleapis.com/v0/b/crowdsourcesocialposts.appspot.com/o/${dirName}%2F${fileName}?alt=media&token=bd030137-3020-42ac-be32-4eaab299dc5c`;
    }
}

export function appendMediaUrlToPost(post: Post) {
    if (post instanceof Post) {
        const data: any = post.get({plain: true});
        const mediaUrl = deduceMediaUrl(
            data.user.mediaSource.serviceName,
            data.user.mediaSource.dirName,
            data.filename);
        return { ...data, mediaUrl };
    } else {
        return post;
    }
}*/

MetadataText.init(
    {
        post_id: Sequelize.INTEGER,
        value: Sequelize.STRING,
        created_by: Sequelize.INTEGER,
        created_at: Sequelize.DATE,
    },
    {
        sequelize: db.get(),
        tableName: 'metadata_text',
        modelName: 'metadataText',
        timestamps: false
    },
);

//Post.belongsTo(User);

export async function create(param: MetadataTextCreateRequest): Promise<any> {
    var transaction = await db.get().transaction();
    try
    {
        var textItem: any = await MetadataText!.create(param.getAll(), {transaction: transaction});
        textItem = await textItem!.get({plain : true});
        var indexItem: any = await createIndex(new MetadataIndexCreateRequest({metadata_type: 1, metadata_id: textItem.id, post_id: param.post_id}));
        await transaction.commit();
        return Promise.resolve({...textItem, metadata_id: textItem.id, id: indexItem.id});
    }
    catch(err)
    {
        console.log(err);
        await transaction.rollback();
        return Promise.resolve({
            message: 'Error Creating Text item',
            error: JSON.stringify(err),
        });
    }
}

export function update(param: MetadataTextUpdateRequest): Promise<any> {
    return MetadataIndex.findOne({
        where: {
            id: param.id,
        }
    })
    .then((metadataIndex) => {
        let metadataIndexObj: any = metadataIndex!.get({plain:true});
        return  MetadataText.findOne({
            where: {
                id: metadataIndexObj.metadata_id
            }
        })
    })
    .then(async (metadataText) => {
        let metadataObj: any = metadataText!.get({plain:true});
        var transaction = await db.get().transaction();
        try
        {
            console.log(metadataObj);
            let insertPayload: any = {...metadataObj, item_id: metadataObj.id, moved_at: param.created_at};
            delete insertPayload.id;
            var historyItem: MetadataHistoryText = await MetadataHistoryText.create(insertPayload, {transaction: transaction});
            await metadataText!.update({value: param.value, created_by: param.created_by, created_at: param.created_at});
            await transaction.commit();
            return Promise.resolve({message: 'success'});
        }
        catch(err)
        {
            await transaction.rollback();
            console.log(err);
            return Promise.resolve({
                message: 'Error Updating Text item',
                error: JSON.stringify(err),
            });
        }
    
    });
}

export function get(id: number) {
    return MetadataText.findOne({
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